import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, CheckCircle, BarChart2 } from 'lucide-react';
import SystemHealthCard from '../components/admin/SystemHealthCard';
import { useExam } from '../hooks/useExam';

const AdminDashboardPage = () => {
  const { exams } = useExam();

  return (
    <div className="dashboard-layout">
      <aside className="bg-light" style={{ width: '250px', padding: '2rem 1rem', borderRight: '1px solid var(--border-color)' }}>
        <h3 className="mb-4 px-3 text-sm text-light" style={{ textTransform: 'uppercase' }}>Admin Menu</h3>
        <nav className="d-flex flex-column gap-2">
          <Link to="/admin/dashboard" className="btn btn-secondary w-100 text-left d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
            <BarChart2 size={18} /> Dashboard
          </Link>
          <Link to="/admin/exams" className="btn btn-secondary w-100 text-left d-flex align-items-center gap-2">
            <BookOpen size={18} /> Exams
          </Link>
          <Link to="#" className="btn btn-secondary w-100 text-left d-flex align-items-center gap-2">
            <CheckCircle size={18} /> Submissions
          </Link>
          <Link to="#" className="btn btn-secondary w-100 text-left d-flex align-items-center gap-2">
            <Users size={18} /> Students
          </Link>
        </nav>
      </aside>
      
      <main className="dashboard-content">
        <h2 className="mb-4">Admin Dashboard</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card d-flex align-items-center gap-3">
            <BookOpen size={32} color="var(--primary-color)" />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{exams.length || 3}</div>
              <div style={{ color: 'var(--text-light)' }}>Total Exams</div>
            </div>
          </div>
          <div className="card d-flex align-items-center gap-3">
            <Users size={32} color="var(--info-color)" />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>120</div>
              <div style={{ color: 'var(--text-light)' }}>Total Students</div>
            </div>
          </div>
          <div className="card d-flex align-items-center gap-3">
            <CheckCircle size={32} color="var(--success-color)" />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>45</div>
              <div style={{ color: 'var(--text-light)' }}>Submissions</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          <div>
            <div className="card">
              <h3 className="mb-4">Recent Exams</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ paddingBottom: '0.5rem' }}>Title</th>
                    <th style={{ paddingBottom: '0.5rem' }}>Questions</th>
                    <th style={{ paddingBottom: '0.5rem' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.slice(0, 3).map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 0' }}>{e.title}</td>
                      <td style={{ padding: '0.75rem 0' }}>{e.questionCount}</td>
                      <td style={{ padding: '0.75rem 0' }}>{e.duration}m</td>
                    </tr>
                  ))}
                  {exams.length === 0 && <tr><td colSpan="3" style={{ padding: '1rem 0' }}>Loading exams...</td></tr>}
                </tbody>
              </table>
              <div className="mt-3">
                <Link to="/admin/exams" className="btn btn-secondary btn-sm">Manage All Exams</Link>
              </div>
            </div>
          </div>
          <div>
            <SystemHealthCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
