import React from 'react';
import { Link } from 'react-router-dom';
import { useExam } from '../hooks/useExam';
import { BookOpen, Plus, Edit, Trash2, Settings } from 'lucide-react';

const ManageExamsPage = () => {
  const { exams, loading, error } = useExam();

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Exams</h2>
        <Link to="/admin/exams/create" className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Create New Exam
        </Link>
      </div>

      {loading ? <p>Loading exams...</p> : error ? (
        <div>
          <p className="text-danger" style={{ color: 'var(--danger-color)' }}>Unable to load examinations. Please try again.</p>
          <button onClick={() => window.location.reload()} className="btn btn-secondary btn-sm mt-2">Retry</button>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem' }}>Exam ID</th>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Questions</th>
                <th style={{ padding: '1rem' }}>Total Marks</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => (
                <tr key={exam.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-light)', fontFamily: 'monospace' }}>{exam.id}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{exam.title}</td>
                  <td style={{ padding: '1rem' }}>{exam.duration} mins</td>
                  <td style={{ padding: '1rem' }}>{exam.questionCount}</td>
                  <td style={{ padding: '1rem' }}>{exam.totalMarks}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: 'var(--success-color)'
                    }}>{exam.status}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div className="d-flex gap-2">
                      <Link to={`/admin/exams/${exam.id}/questions`} className="btn btn-secondary btn-sm" title="Manage Questions">
                        <Settings size={16} />
                      </Link>
                      <button className="btn btn-secondary btn-sm" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn btn-danger btn-sm" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {exams.length === 0 && <tr><td colSpan="7" style={{ padding: '1rem', textAlign: 'center' }}>No exams found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageExamsPage;
