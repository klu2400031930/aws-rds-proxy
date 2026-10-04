import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Shield, Zap, Database, Activity, ArrowDown } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container text-center">
          <h1>Examinations, Powered by the Cloud.</h1>
          <p className="subtitle">A secure and scalable online examination platform built with modern serverless cloud architecture.</p>
          <div className="hero-buttons mt-4 gap-3 d-flex justify-content-center">
            <Link to="/login" className="btn btn-primary">Start Examination</Link>
            <a href="#architecture" className="btn btn-secondary">Explore Platform</a>
          </div>
        </div>
      </section>

      <section className="features bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Features</h2>
          <div className="features-grid">
            <div className="card feature-card text-center">
              <Shield className="feature-icon mb-2" size={40} />
              <h3>Secure Examinations</h3>
              <p>Advanced security to ensure exam integrity and protect data.</p>
            </div>
            <div className="card feature-card text-center">
              <Zap className="feature-icon mb-2" size={40} />
              <h3>Real-Time Evaluation</h3>
              <p>Instant grading and detailed results immediately after submission.</p>
            </div>
            <div className="card feature-card text-center">
              <Server className="feature-icon mb-2" size={40} />
              <h3>Scalable Cloud Architecture</h3>
              <p>Built on AWS serverless tech to handle thousands of concurrent users.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="architecture">
        <div className="container text-center">
          <h2 className="mb-4">System Architecture</h2>
          <div className="architecture-flow">
            <div className="arch-node card">React Frontend</div>
            <ArrowDown className="arch-arrow" />
            <div className="arch-node card">API Gateway</div>
            <ArrowDown className="arch-arrow" />
            <div className="arch-node card">AWS Lambda</div>
            <ArrowDown className="arch-arrow" />
            <div className="arch-node card">RDS Proxy</div>
            <ArrowDown className="arch-arrow" />
            <div className="arch-node card">PostgreSQL RDS</div>
          </div>
        </div>
      </section>

      <footer className="footer bg-dark text-white">
        <div className="container text-center">
          <p>&copy; 2026 CloudExam. Secure. Scalable. Serverless.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
