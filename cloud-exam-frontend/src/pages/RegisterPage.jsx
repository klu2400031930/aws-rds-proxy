import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', studentId: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await registerUser({ ...formData, role: 'student' });
      await login(formData.email, formData.password, 'student');
      navigate('/student/dashboard');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="card auth-card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        {error && <div style={{color: 'var(--danger-color)', marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Student ID</label>
            <input type="text" name="studentId" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Account</button>
        </form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
