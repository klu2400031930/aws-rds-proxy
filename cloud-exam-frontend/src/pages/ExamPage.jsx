import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExam } from '../hooks/useExam';
import { useAuth } from '../hooks/useAuth';
import { submitExam } from '../services/submissionService';
import { formatSeconds } from '../utils/formatTime';
import './ExamPage.css';

const ExamPage = () => {
  const { examId } = useParams();
  const { exam, questions, loading, error } = useExam(examId);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (exam && timeLeft === null) {
      setTimeLeft(exam.duration * 60);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      const studentIdToUse = user?.id || 'student-demo';
      const result = await submitExam(examId, studentIdToUse, answers);
      navigate(`/results/${result.id}`);
    } catch (err) {
      alert('Failed to submit exam. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading || !exam || questions.length === 0) return <div className="container">Loading exam...</div>;

  const currentQ = questions[currentQIndex];
  const isTimeLow = timeLeft < 300; // less than 5 mins

  return (
    <div className="exam-page">
      <header className="exam-header">
        <h2>{exam.title}</h2>
        <div className="d-flex align-items-center gap-4">
          <div className={`exam-timer ${isTimeLow ? 'time-low' : ''}`}>
            Time Left: {formatSeconds(timeLeft)}
          </div>
          <button onClick={() => setShowConfirm(true)} className="btn btn-primary" disabled={isSubmitting}>
            Submit Exam
          </button>
        </div>
      </header>

      <div className="exam-content">
        <div className="exam-main">
          <div className="card question-card">
            <h4 className="mb-4">Question {currentQIndex + 1} of {questions.length}</h4>
            <p className="question-text mb-4" style={{ fontSize: '1.2rem', fontWeight: '500' }}>{currentQ.questionText}</p>
            
            <div className="options-list">
              {['A', 'B', 'C', 'D'].map(opt => {
                const optKey = `option${opt}`;
                if (!currentQ[optKey]) return null;
                return (
                  <label key={opt} className={`option-label ${answers[currentQ.id] === opt ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name={currentQ.id} 
                      value={opt} 
                      checked={answers[currentQ.id] === opt}
                      onChange={() => handleOptionSelect(currentQ.id, opt)}
                    />
                    <span className="option-text">{currentQ[optKey]}</span>
                  </label>
                )
              })}
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
            >
              Previous
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <aside className="exam-sidebar card">
          <h4 className="mb-3">Question Navigator</h4>
          <div className="navigator-grid">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                className={`nav-bubble ${answers[q.id] ? 'answered' : 'unanswered'} ${currentQIndex === idx ? 'current' : ''}`}
                onClick={() => setCurrentQIndex(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="nav-legend mt-4">
            <div className="legend-item"><span className="bubble-sample answered"></span> Answered</div>
            <div className="legend-item"><span className="bubble-sample unanswered"></span> Unanswered</div>
            <div className="legend-item"><span className="bubble-sample current"></span> Current</div>
          </div>
        </aside>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="card modal-content">
            <h3 className="mb-3">Submit Examination?</h3>
            <p className="mb-4">Are you sure you want to submit? You still have {questions.length - Object.keys(answers).length} unanswered questions.</p>
            <div className="d-flex justify-content-end gap-3">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleFinalSubmit} disabled={isSubmitting}>Confirm Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
