import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './AuthPages.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', age: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (parseInt(form.age) < 16) {
      setError('BudgetBuddy is for students aged 16 and above.');
      return;
    }
    setLoading(true);
    // TODO: Connect to Flask API
    setTimeout(() => {
      setLoading(false);
      setError('Backend not connected yet. Coming soon!');
    }, 1200);
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (p.length < 8)  return { label: 'Fair', color: '#f59e0b', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: '#3b82f6', width: '75%' };
    return { label: 'Strong', color: '#00C853', width: '100%' };
  };

  const strength = passwordStrength();

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
            Start Your<br />Financial<br /><span>Journey Today</span>
          </h2>
          <p className="auth-left-sub">
            Create your free account in seconds. No credit card required — just your student email.
          </p>
          <div className="auth-features-list">
            {[
              '✅ 100% Free for students',
              '📊 Beautiful spending charts',
              '🎯 Set & track savings goals',
              '🔔 Smart budget alerts',
              '🔒 Secure & private',
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
            <h3>Create Your Account 🎓</h3>
            <p>100% Free — No credit card, no hidden charges</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name */}
            <div className="auth-field">
              <label>Full Name</label>
              <div className="input-wrap">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

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

            {/* Age */}
            <div className="auth-field">
              <label>Age <span className="age-note">(Must be 16+)</span></label>
              <div className="input-wrap">
                <FaUser className="input-icon" />
                <input
                  type="number"
                  placeholder="Your age"
                  min="16"
                  max="99"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)} aria-label="toggle">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {strength && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div style={{ width: strength.width, background: strength.color }} />
                  </div>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <FaLock className="input-icon" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                />
                <button type="button" className="input-eye" onClick={() => setShowConfirm(!showConfirm)} aria-label="toggle">
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
                {form.confirm && form.password === form.confirm && (
                  <FaCheckCircle className="input-match-icon" />
                )}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <><span>Create Free Account</span> <FaArrowRight /></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <Link to="/" className="auth-back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
