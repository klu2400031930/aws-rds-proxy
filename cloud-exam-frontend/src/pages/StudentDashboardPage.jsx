import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useExam } from '../hooks/useExam';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { exams, loading, error } = useExam();

  return (
    <div className="container">
      <div className="mb-4">
        <h1>Welcome back, {user?.name || 'Student'}!</h1>
        <p className="text-light">Here is an overview of your examinations.</p>
      </div>
      
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card d-flex align-items-center gap-3">
          <BookOpen size={32} color="var(--primary-color)" />
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{exams.length}</div>
            <div style={{ color: 'var(--text-light)' }}>Available Exams</div>
          </div>
        </div>
        <div className="card d-flex align-items-center gap-3">
          <CheckCircle size={32} color="var(--success-color)" />
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1</div>
            <div style={{ color: 'var(--text-light)' }}>Completed Exams</div>
          </div>
        </div>
      </div>

      <h2 className="mb-3">Available Examinations</h2>
      {loading ? <p>Loading examinations...</p> : error ? (
        <div>
          <p className="text-danger" style={{ color: 'var(--danger-color)' }}>Unable to load examinations. Please try again.</p>
          <button onClick={reload} className="btn btn-secondary btn-sm mt-2">Retry</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {exams.map(exam => (
            <div key={exam.id} className="card">
              <h3>{exam.title}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1rem', minHeight: '3rem' }}>{exam.description}</p>
              <div className="d-flex justify-content-between mb-3 text-sm" style={{ color: 'var(--text-light)' }}>
                <span className="d-flex align-items-center gap-1"><BookOpen size={16}/> {exam.questionCount} Questions</span>
                <span className="d-flex align-items-center gap-1"><Clock size={16}/> {exam.duration} mins</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span style={{ fontWeight: '600' }}>{exam.totalMarks} Marks</span>
                <Link to={`/exams/${exam.id}`} className="btn btn-primary">View Exam</Link>
              </div>
            </div>
          ))}
          {exams.length === 0 && <p>No examinations available.</p>}
        </div>
      )}
    </div>
  );
};

export default StudentDashboardPage;
