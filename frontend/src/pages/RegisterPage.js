import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWallet, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaArrowRight, FaCheckCircle, FaPhone, FaCalendarAlt
} from 'react-icons/fa';
import './AuthPages.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', dob: '',
    password: '', confirm: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (calculateAge(form.dob) < 16) { setError('You must be at least 16 years old to register.'); return; }
    if (!/^[0-9]{10}$/.test(form.mobile)) { setError('Enter a valid 10-digit mobile number.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1200);
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (p.length < 8) return { label: 'Fair', color: '#f59e0b', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: '#3b82f6', width: '75%' };
    return { label: 'Strong', color: '#00C853', width: '100%' };
  };

  const strength = passwordStrength();

  if (success) return (
    <div className="auth-page">
      <div className="auth-right" style={{ flex: 1 }}>
        <div className="auth-form-wrap text-center">
          <div className="success-screen">
            <div className="success-icon"><FaCheckCircle /></div>
            <h3>Account Created! 🎉</h3>
            <p>Welcome to BudgetBuddy, <strong>{form.fullName}</strong>!</p>
            <p className="success-sub">Your free account is ready. Start tracking your expenses now.</p>
            <Link to="/login" className="auth-submit-btn" style={{ textDecoration: 'none', marginTop: 24, display: 'inline-flex' }}>
              Go to Login <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

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
            Create your free account in seconds. No credit card required.
          </p>
          <div className="auth-features-list">
            {['✅ 100% Free for students','📊 Beautiful spending charts','🎯 Set & track savings goals','🔔 Smart budget alerts','🔒 Secure & private'].map((f, i) => (
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
            {/* Full Name */}
            <div className="auth-field">
              <label>Full Name</label>
              <div className="input-wrap">
                <FaUser className="input-icon" />
                <input type="text" placeholder="e.g. Priya Sharma"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="input-wrap">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            {/* Mobile */}
            <div className="auth-field">
              <label>Mobile Number</label>
              <div className="input-wrap">
                <FaPhone className="input-icon" />
                <input type="tel" placeholder="10-digit mobile number"
                  value={form.mobile} maxLength={10}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/,'') })} required />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="auth-field">
              <label>
                Date of Birth
                <span className="age-note"> (Must be 16+)</span>
                {form.dob && (
                  <span className={`age-calc ${calculateAge(form.dob) >= 16 ? 'age-ok' : 'age-err'}`}>
                    &nbsp;— Age: {calculateAge(form.dob)}
                  </span>
                )}
              </label>
              <div className="input-wrap">
                <FaCalendarAlt className="input-icon" />
                <input type="date" max={new Date().toISOString().split('T')[0]}
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })} required />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="input-wrap">
                <FaLock className="input-icon" />
                <input type={showPass ? 'text' : 'password'} placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {strength && (
                <div className="password-strength">
                  <div className="strength-bar"><div style={{ width: strength.width, background: strength.color }} /></div>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <FaLock className="input-icon" />
                <input type={showConfirm ? 'text' : 'password'} placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
                <button type="button" className="input-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
                {form.confirm && form.password === form.confirm && <FaCheckCircle className="input-match-icon" />}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : <><span>Create Free Account</span><FaArrowRight /></>}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <Link to="/" className="auth-back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
