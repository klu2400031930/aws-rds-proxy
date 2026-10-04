import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudentResults } from '../services/resultService';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatDate';

const MyResultsPage = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getStudentResults(user.id);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [user]);

  return (
    <div className="container">
      <h2 className="mb-4">My Results</h2>
      
      {loading ? <p>Loading results...</p> : results.length === 0 ? <p>No results found.</p> : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem' }}>Exam</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Score</th>
                <th style={{ padding: '1rem' }}>Percentage</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{r.examTitle}</td>
                  <td style={{ padding: '1rem' }}>{formatDate(r.submittedAt)}</td>
                  <td style={{ padding: '1rem' }}>{r.score}/{r.totalMarks}</td>
                  <td style={{ padding: '1rem' }}>{r.percentage}%</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: r.status === 'PASSED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: r.status === 'PASSED' ? 'var(--success-color)' : 'var(--danger-color)'
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <Link to={`/results/${r.id}`} className="btn btn-secondary btn-sm">View Result</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyResultsPage;
