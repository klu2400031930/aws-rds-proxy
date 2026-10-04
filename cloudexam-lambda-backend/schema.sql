CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    passing_marks INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    marks INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL REFERENCES exams(id),
    student_id VARCHAR(255) NOT NULL,
    answers JSONB NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    incorrect_answers INTEGER NOT NULL,
    unanswered INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
