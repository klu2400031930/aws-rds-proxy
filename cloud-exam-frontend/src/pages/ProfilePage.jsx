import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Hash, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">My Profile</h2>
      <div className="card text-center mb-4">
        <div style={{ 
          width: '100px', height: '100px', 
          backgroundColor: 'var(--primary-color)', 
          color: 'white', 
          borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto'
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h3>{user?.name}</h3>
        <p className="text-light">{user?.role === 'admin' ? 'Administrator' : 'Student'}</p>
      </div>

      <div className="card">
        <h4 className="mb-3">Personal Information</h4>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-3">
            <User color="var(--text-light)" />
            <div>
              <div className="text-sm text-light">Full Name</div>
              <div className="font-weight-500">{user?.name}</div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Mail color="var(--text-light)" />
            <div>
              <div className="text-sm text-light">Email Address</div>
              <div className="font-weight-500">{user?.email}</div>
            </div>
          </div>
          {user?.role === 'student' && (
            <div className="d-flex align-items-center gap-3">
              <Hash color="var(--text-light)" />
              <div>
                <div className="text-sm text-light">Student ID</div>
                <div className="font-weight-500">{user?.studentId || 'N/A'}</div>
              </div>
            </div>
          )}
          <div className="d-flex align-items-center gap-3">
            <Shield color="var(--text-light)" />
            <div>
              <div className="text-sm text-light">Role</div>
              <div className="font-weight-500" style={{ textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
