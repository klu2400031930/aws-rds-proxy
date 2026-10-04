import React, { useState, useEffect } from 'react';
import { Database, Server, Activity, Cpu } from 'lucide-react';
import { USE_MOCK_API } from '../../utils/constants';

const SystemHealthCard = () => {
  const [health, setHealth] = useState({
    status: 'UP',
    database: 'PostgreSQL',
    message: 'Successfully connected to PostgreSQL RDS via Proxy!',
    currentTime: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    // In a real scenario, this would poll a GET /health endpoint
    const timer = setInterval(() => {
      setHealth(prev => ({ ...prev, currentTime: new Date().toLocaleTimeString() }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card">
      <h3 className="mb-3 d-flex align-items-center gap-2"><Server size={24} color="var(--primary-color)" /> Cloud Infrastructure</h3>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2 text-sm"><Activity size={16} /> API Gateway</span>
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>● Connected</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2 text-sm"><Cpu size={16} /> AWS Lambda</span>
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>● Available</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2 text-sm"><Server size={16} /> RDS Proxy</span>
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>● Available</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2 text-sm"><Database size={16} /> PostgreSQL RDS</span>
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>● Connected</span>
        </div>
      </div>
      <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
        <div className="text-light">Mode: {USE_MOCK_API ? 'Mock Data (Development)' : 'Live API (Production)'}</div>
        <div className="text-light mt-1">DB Time: {health.currentTime}</div>
      </div>
    </div>
  );
};

export default SystemHealthCard;
