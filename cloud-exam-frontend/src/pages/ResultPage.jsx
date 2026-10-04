import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResult } from '../services/resultService';
import { CheckCircle, XCircle, Clock, Award, ChevronLeft } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

const ResultPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getResult(resultId);
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [resultId]);

  if (loading) return <div className="container">Loading result...</div>;
  if (!result) return <div className="container">Result not found.</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link to="/results" className="d-flex align-items-center gap-1 mb-4" style={{ color: 'var(--text-light)' }}>
        <ChevronLeft size={20} /> Back to My Results
      </Link>
      
      <div className="card text-center mb-4">
        <h2 className="mb-2">{result.examTitle}</h2>
        <p className="text-light mb-4">Submitted on {formatDate(result.submittedAt)}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '150px', height: '150px', 
            borderRadius: '50%', 
            border: `8px solid ${result.status === 'PASSED' ? 'var(--success-color)' : 'var(--danger-color)'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{result.percentage}%</span>
            <span style={{ color: 'var(--text-light)', fontWeight: '500' }}>{result.status}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'left' }}>
          <div className="card bg-light text-center">
            <Award className="mx-auto mb-2" color="var(--primary-color)" />
            <div className="text-light text-sm">Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.score} / {result.totalMarks}</div>
          </div>
          <div className="card bg-light text-center">
            <CheckCircle className="mx-auto mb-2" color="var(--success-color)" />
            <div className="text-light text-sm">Correct</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.correctAnswers}</div>
          </div>
          <div className="card bg-light text-center">
            <XCircle className="mx-auto mb-2" color="var(--danger-color)" />
            <div className="text-light text-sm">Incorrect</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.incorrectAnswers}</div>
          </div>
          <div className="card bg-light text-center">
            <Clock className="mx-auto mb-2" color="var(--warning-color)" />
            <div className="text-light text-sm">Unanswered</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.unanswered}</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/student/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default ResultPage;
