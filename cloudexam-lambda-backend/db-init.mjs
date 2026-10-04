import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Pool } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  max: 1 // Only need 1 connection for init
});

export const handler = async (event) => {
  let client;
  try {
    console.log('Connecting to PostgreSQL via RDS Proxy...');
    client = await pool.connect();
    console.log('Connection successful.');

    // 1. Read and execute schema.sql
    console.log('Reading schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    console.log('Executing schema.sql...');
    await client.query(schemaSql);

    // 2. Read and execute seed.sql
    console.log('Reading seed.sql...');
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    console.log('Executing seed.sql...');
    await client.query(seedSql);

    console.log('Database initialization scripts executed successfully.');

    // 3. Verification Queries
    const totalExamsRes = await client.query('SELECT COUNT(*) as count FROM exams;');
    const totalQuestionsRes = await client.query('SELECT COUNT(*) as count FROM questions;');

    const verificationQuery = `
      SELECT 
        e.title, 
        COUNT(q.id) as questions_count, 
        SUM(q.marks) as calculated_marks, 
        e.total_marks as configured_total_marks, 
        e.passing_marks 
      FROM exams e
      LEFT JOIN questions q ON e.id = q.exam_id 
      GROUP BY e.id, e.title, e.total_marks, e.passing_marks
      ORDER BY e.id;
    `;
    const detailsRes = await client.query(verificationQuery);

    const result = {
      message: 'Database initialized successfully',
      totalExams: parseInt(totalExamsRes.rows[0].count),
      totalQuestions: parseInt(totalQuestionsRes.rows[0].count),
      examDetails: detailsRes.rows.map(row => ({
        title: row.title,
        questionsCount: parseInt(row.questions_count),
        calculatedMarks: parseInt(row.calculated_marks),
        configuredTotalMarks: row.configured_total_marks,
        passingMarks: row.passing_marks
      }))
    };

    console.log('Verification Complete:', JSON.stringify(result));
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2)
    };

  } catch (error) {
    console.error('Initialization Error:', error.message);
    // Explicitly avoiding logging the full error object if it contains connection strings
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Initialization failed', error: error.message })
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};
