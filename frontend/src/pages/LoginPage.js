import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import './AuthPages.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: Connect to Flask API
    setTimeout(() => {
      setLoading(false);
      // navigate('/dashboard');
      setError('Backend not connected yet. Coming soon!');
    }, 1200);
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <Link to="/" className="auth-brand">
            <div className="auth-brand-logo"><FaWallet /></div>
            <span>Budget<strong>Buddy</strong></span>
          </Link>
          <h2 className="auth-left-title">
            Track Smart.<br />Save More.<br /><span>Live Better.</span>
          </h2>
          <p className="auth-left-sub">
            Join 10,000+ students who manage their finances with BudgetBuddy — the smartest way to stay on budget.
          </p>
          <div className="auth-features-list">
            {[
              '📊 Real-time spending charts',
              '🔔 Budget overspend alerts',
              '🎯 Savings goal tracker',
              '📋 Full expense history',
            ].map((f, i) => (
              <div className="auth-feature-item" key={i}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-header">
            <h3>Welcome Back 👋</h3>
            <p>Sign in to your BudgetBuddy account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="input-wrap">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="input-wrap">
                <FaLock className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="input-eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="field-footer">
                <a href="#!" className="forgot-link">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <><span>Sign In</span> <FaArrowRight /></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>

          <Link to="/" className="auth-back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
