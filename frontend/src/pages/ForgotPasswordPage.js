import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaEnvelope, FaLock, FaArrowRight, FaCheckCircle, FaKey } from 'react-icons/fa';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1=Email, 2=OTP, 3=Reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['','','','','','']);
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1200);
  };

  const handleOtpChange = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) document.getElementById(`otp-${idx+1}`)?.focus();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1200);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  if (done) return (
    <div className="auth-page">
      <div className="auth-right" style={{ flex: 1 }}>
        <div className="auth-form-wrap">
          <div className="success-screen">
            <div className="success-icon"><FaCheckCircle /></div>
            <h3>Password Reset! 🎉</h3>
            <p>Your password has been updated successfully.</p>
            <Link to="/login" className="auth-submit-btn" style={{ textDecoration:'none', marginTop:24, display:'inline-flex' }}>
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
          <h2 className="auth-left-title">Reset Your<br /><span>Password</span></h2>
          <p className="auth-left-sub">Follow the 3 simple steps to recover your account access.</p>
          <div className="fp-steps">
            {[{n:1,label:'Enter Email'},{n:2,label:'Verify OTP'},{n:3,label:'New Password'}].map(s => (
              <div className={`fp-step ${step >= s.n ? 'active' : ''}`} key={s.n}>
                <div className="fp-step-num">{step > s.n ? '✓' : s.n}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          {/* Step 1 — Email */}
          {step === 1 && (
            <>
              <div className="auth-form-header">
                <h3>Forgot Password? 🔑</h3>
                <p>Enter your registered email to receive an OTP</p>
              </div>
              <form onSubmit={handleEmailSubmit} className="auth-form">
                <div className="auth-field">
                  <label>Email Address</label>
                  <div className="input-wrap">
                    <FaEnvelope className="input-icon" />
                    <input type="email" placeholder="your@email.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : <><span>Send OTP</span><FaArrowRight /></>}
                </button>
              </form>
            </>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <>
              <div className="auth-form-header">
                <h3>Enter OTP 📱</h3>
                <p>We sent a 6-digit OTP to <strong>{email}</strong></p>
              </div>
              <form onSubmit={handleOtpSubmit} className="auth-form">
                <div className="otp-boxes">
                  {otp.map((v, i) => (
                    <input key={i} id={`otp-${i}`} type="text" maxLength={1}
                      className="otp-box" value={v}
                      onChange={(e) => handleOtpChange(e.target.value, i)} required />
                  ))}
                </div>
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : <><span>Verify OTP</span><FaArrowRight /></>}
                </button>
                <button type="button" className="resend-btn" onClick={() => {}}>Resend OTP</button>
              </form>
            </>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <>
              <div className="auth-form-header">
                <h3>Set New Password 🔒</h3>
                <p>Choose a strong new password for your account</p>
              </div>
              <form onSubmit={handleResetSubmit} className="auth-form">
                <div className="auth-field">
                  <label>New Password</label>
                  <div className="input-wrap">
                    <FaLock className="input-icon" />
                    <input type="password" placeholder="New password (min 6 chars)"
                      value={passwords.password}
                      onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} required />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Confirm New Password</label>
                  <div className="input-wrap">
                    <FaKey className="input-icon" />
                    <input type="password" placeholder="Repeat new password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} required />
                  </div>
                  {passwords.confirm && passwords.password !== passwords.confirm && (
                    <p style={{ color:'#ef4444', fontSize:'0.8rem', marginTop:4 }}>Passwords do not match</p>
                  )}
                </div>
                <button type="submit" className="auth-submit-btn"
                  disabled={loading || passwords.password !== passwords.confirm}>
                  {loading ? <span className="btn-spinner" /> : <><span>Reset Password</span><FaArrowRight /></>}
                </button>
              </form>
            </>
          )}

          <Link to="/login" className="auth-back-link" style={{ marginTop: 20 }}>← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
