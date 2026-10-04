import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useExam } from '../hooks/useExam';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

const ExamDetailsPage = () => {
  const { examId } = useParams();
  const { exam, loading, error } = useExam(examId);

  if (loading) return <div className="container"><p>Loading examination details...</p></div>;
  if (error || !exam) return (
    <div className="container">
      <p style={{ color: 'var(--danger-color)' }}>Unable to load examination details. Please try again.</p>
      <button onClick={() => window.location.reload()} className="btn btn-secondary mt-2">Retry</button>
    </div>
  );

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card">
        <h1 className="mb-2">{exam.title}</h1>
        <p className="text-light mb-4">{exam.description}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div className="card bg-light">
            <strong>Duration</strong>
            <div className="d-flex align-items-center gap-2 mt-1"><Clock size={20}/> {exam.duration} Minutes</div>
          </div>
          <div className="card bg-light">
            <strong>Questions</strong>
            <div className="d-flex align-items-center gap-2 mt-1"><CheckCircle size={20}/> {exam.questionCount} Questions</div>
          </div>
          <div className="card bg-light">
            <strong>Total Marks</strong>
            <div className="mt-1">{exam.totalMarks} Marks</div>
          </div>
          <div className="card bg-light">
            <strong>Passing Marks</strong>
            <div className="mt-1">{Math.ceil(exam.totalMarks * 0.4)} Marks</div>
          </div>
        </div>

        <h3 className="mb-3">Instructions</h3>
        <ul className="mb-4" style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Do not refresh the page during the exam.</li>
          <li>Submit before the timer expires. Auto-submit will trigger when time is up.</li>
          <li>Only one submission is allowed.</li>
          <li>Make sure all answers are reviewed before final submission.</li>
        </ul>

        <div className="d-flex align-items-center gap-2 mb-4 p-3" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', borderRadius: 'var(--border-radius)' }}>
          <AlertCircle size={24} />
          <span>Once started, the timer cannot be paused. Make sure you have a stable internet connection.</span>
        </div>

        <div className="text-center">
          <Link to={`/exams/${exam.id}/start`} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Start Examination</Link>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
