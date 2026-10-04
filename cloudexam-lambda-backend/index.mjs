import pkg from 'pg';
const { Pool } = pkg;

// Use a module-level PostgreSQL Pool so connections can be reused across Lambda invocations.
// RDS Proxy handles connection pooling on the AWS side.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
};

const sendResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body)
  };
};

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify({ method: event.httpMethod, path: event.path || event.rawPath }));
  
  const httpMethod = event.httpMethod || event.requestContext?.http?.method;
  const path = event.path || event.rawPath;
  const pathParameters = event.pathParameters || {};
  
  // Handle CORS Preflight
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // GET /exams
    if (httpMethod === 'GET' && path === '/exams') {
      const { rows } = await pool.query('SELECT * FROM exams');
      const exams = rows.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        durationMinutes: r.duration_minutes,
        totalMarks: r.total_marks,
        passingMarks: r.passing_marks
      }));
      return sendResponse(200, exams);
    }

    // GET /exams/{id}
    if (httpMethod === 'GET' && path.match(/^\/exams\/[0-9]+$/)) {
      const examId = path.split('/')[2];
      const { rows } = await pool.query('SELECT * FROM exams WHERE id = $1', [examId]);
      if (rows.length === 0) return sendResponse(404, { message: 'Exam not found' });
      
      const r = rows[0];
      return sendResponse(200, {
        id: r.id,
        title: r.title,
        description: r.description,
        durationMinutes: r.duration_minutes,
        totalMarks: r.total_marks,
        passingMarks: r.passing_marks
      });
    }

    // GET /exams/{id}/questions
    if (httpMethod === 'GET' && path.match(/^\/exams\/[0-9]+\/questions$/)) {
      const examId = path.split('/')[2];
      
      // Verify exam exists
      const examCheck = await pool.query('SELECT id FROM exams WHERE id = $1', [examId]);
      if (examCheck.rows.length === 0) return sendResponse(404, { message: 'Exam not found' });

      // NEVER return correct_answer
      const { rows } = await pool.query(
        'SELECT id, exam_id, question_text, option_a, option_b, option_c, option_d, marks FROM questions WHERE exam_id = $1', 
        [examId]
      );
      
      const questions = rows.map(r => ({
        id: r.id,
        examId: r.exam_id,
        questionText: r.question_text,
        optionA: r.option_a,
        optionB: r.option_b,
        optionC: r.option_c,
        optionD: r.option_d,
        marks: r.marks
      }));
      
      return sendResponse(200, questions);
    }

    // POST /submissions
    if (httpMethod === 'POST' && path === '/submissions') {
      if (!event.body) return sendResponse(400, { message: 'Invalid submission format' });
      
      const body = JSON.parse(event.body);
      const { examId, studentId, answers } = body;

      if (!examId || !studentId || !answers) {
        return sendResponse(400, { message: 'Missing examId, studentId, or answers' });
      }

      // Fetch exam details
      const examRes = await pool.query('SELECT * FROM exams WHERE id = $1', [examId]);
      if (examRes.rows.length === 0) return sendResponse(404, { message: 'Exam not found' });
      const exam = examRes.rows[0];

      // Fetch all questions with answers for evaluation
      const qRes = await pool.query('SELECT id, correct_answer, marks FROM questions WHERE exam_id = $1', [examId]);
      const questions = qRes.rows;

      if (questions.length === 0) return sendResponse(400, { message: 'Exam has no questions' });

      let score = 0;
      let correctAnswersCount = 0;
      let incorrectAnswersCount = 0;
      let unansweredCount = 0;

      // Evaluation Logic
      questions.forEach(q => {
        const studentAnswer = answers[q.id.toString()];
        if (!studentAnswer) {
          unansweredCount++;
        } else if (studentAnswer === q.correct_answer) {
          score += q.marks;
          correctAnswersCount++;
        } else {
          incorrectAnswersCount++;
        }
      });

      const percentage = (score / exam.total_marks) * 100;
      const status = score >= exam.passing_marks ? 'PASSED' : 'FAILED';

      // Use a transaction
      const client = await pool.connect();
      let resultId;
      
      try {
        await client.query('BEGIN');
        
        // Save submission
        const subRes = await client.query(
          'INSERT INTO submissions (exam_id, student_id, answers) VALUES ($1, $2, $3) RETURNING id',
          [examId, studentId, JSON.stringify(answers)]
        );
        const submissionId = subRes.rows[0].id;

        // Save result
        const resInsert = await client.query(
          `INSERT INTO results 
           (submission_id, score, total_marks, correct_answers, incorrect_answers, unanswered, percentage, status) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
          [submissionId, score, exam.total_marks, correctAnswersCount, incorrectAnswersCount, unansweredCount, percentage, status]
        );
        resultId = resInsert.rows[0].id;
        
        await client.query('COMMIT');
        
        return sendResponse(201, {
          id: resultId,
          submissionId,
          score,
          totalMarks: exam.total_marks,
          correctAnswers: correctAnswersCount,
          incorrectAnswers: incorrectAnswersCount,
          unanswered: unansweredCount,
          percentage: parseFloat(percentage.toFixed(2)),
          status
        });
        
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    }

    // GET /results/{id}
    if (httpMethod === 'GET' && path.match(/^\/results\/[0-9]+$/)) {
      const resultId = path.split('/')[2];
      const { rows } = await pool.query('SELECT * FROM results WHERE id = $1', [resultId]);
      if (rows.length === 0) return sendResponse(404, { message: 'Result not found' });
      
      const r = rows[0];
      return sendResponse(200, {
        id: r.id,
        submissionId: r.submission_id,
        score: r.score,
        totalMarks: r.total_marks,
        correctAnswers: r.correct_answers,
        incorrectAnswers: r.incorrect_answers,
        unanswered: r.unanswered,
        percentage: parseFloat(r.percentage),
        status: r.status
      });
    }

    return sendResponse(404, { message: 'Route not found' });

  } catch (error) {
    console.error('Lambda execution error:', error);
    return sendResponse(500, { message: 'Internal server error' });
  }
};
