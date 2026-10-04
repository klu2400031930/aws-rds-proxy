import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e, roleOverride = null) => {
    if (e) e.preventDefault();
    try {
      setError('');
      const user = await login(
        roleOverride ? `${roleOverride}@example.com` : email, 
        roleOverride ? 'password' : password,
        roleOverride
      );
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="card auth-card">
        <h2 className="text-center mb-4">Login to CloudExam</h2>
        {error && <div className="alert alert-danger mb-3" style={{color: 'var(--danger-color)'}}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" style={{width: '100%'}}>Login</button>
        </form>
        <div className="text-center mb-3">
          <a href="#" className="text-sm">Forgot Password?</a>
        </div>
        <hr className="mb-3" />
        <div className="demo-buttons d-flex flex-column gap-2">
          <button onClick={() => handleLogin(null, 'student')} className="btn btn-secondary w-100" style={{width: '100%'}}>Demo: Login as Student</button>
          <button onClick={() => handleLogin(null, 'admin')} className="btn btn-secondary w-100" style={{width: '100%'}}>Demo: Login as Admin</button>
        </div>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
