import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Cloud, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Cloud className="logo-icon" />
          <span>CloudExam</span>
        </Link>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="user-greeting">Hi, {user.name}</span>
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm"><LogOut size={16} className="mr-2" /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary ml-2">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
