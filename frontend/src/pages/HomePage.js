import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  FaWallet, FaChartPie, FaBullseye, FaBell,
  FaHistory, FaUserCircle, FaShieldAlt, FaMobileAlt,
  FaUtensils, FaBus, FaBook, FaFilm, FaPhone,
  FaShoppingBag, FaHospital, FaCheckCircle,
  FaEnvelope, FaMapMarkerAlt, FaArrowRight,
  FaStar, FaQuoteLeft
} from 'react-icons/fa';
import './HomePage.css';

/* ───── Static Data ───── */
const features = [
  { icon: <FaChartPie />,   title: 'Visual Spending Reports',  desc: 'Pie and bar charts that clearly show where your money is going each month.', color: '#00C853' },
  { icon: <FaBullseye />,   title: 'Savings Goals',            desc: 'Set personal savings targets and track progress with a visual goal tracker.',   color: '#00BCD4' },
  { icon: <FaBell />,       title: 'Budget Alerts',            desc: 'Get instant alerts when you approach or exceed your monthly budget limit.',      color: '#FF9800' },
  { icon: <FaHistory />,    title: 'Expense History',          desc: 'View, filter, and search your complete spending history at any time.',           color: '#7C4DFF' },
  { icon: <FaUserCircle />, title: 'Profile Management',       desc: 'Update your profile, change password, and manage all account settings.',        color: '#F44336' },
  { icon: <FaShieldAlt />,  title: 'Secure & Private',         desc: 'Your financial data is encrypted and stored securely — only you can see it.',   color: '#1DE9B6' },
];

const categories = [
  { icon: <FaUtensils />,    label: 'Food',          color: '#F44336', bg: '#fde8e8' },
  { icon: <FaBus />,         label: 'Travel',        color: '#2196F3', bg: '#e3f2fd' },
  { icon: <FaBook />,        label: 'Books',         color: '#00C853', bg: '#e8f5e9' },
  { icon: <FaFilm />,        label: 'Entertainment', color: '#7C4DFF', bg: '#ede7f6' },
  { icon: <FaPhone />,       label: 'Recharge',      color: '#FF9800', bg: '#fff3e0' },
  { icon: <FaShoppingBag />, label: 'Shopping',      color: '#E91E63', bg: '#fce4ec' },
  { icon: <FaHospital />,    label: 'Medical',       color: '#00BCD4', bg: '#e0f7fa' },
];

const stats = [
  { value: '10K+', label: 'Students Using BudgetBuddy' },
  { value: '₹50L+', label: 'Expenses Tracked' },
  { value: '95%',   label: 'User Satisfaction' },
  { value: '7',     label: 'Expense Categories' },
];

const testimonials = [
  {
    name: 'Priya Sharma', college: 'Delhi University',
    text: 'BudgetBuddy helped me save ₹3,000 every month just by showing me where I was overspending. The charts are super clear!',
    rating: 5, avatar: 'P',
  },
  {
    name: 'Rahul Mehta', college: 'Mumbai College of Engineering',
    text: 'I used to run out of pocket money before month end. Now with budget alerts, I always stay on track. Game changer!',
    rating: 5, avatar: 'R',
  },
  {
    name: 'Ananya Patel', college: 'Christ University, Bangalore',
    text: 'The savings goals feature is amazing. I saved up for my laptop in 4 months by properly tracking my expenses.',
    rating: 5, avatar: 'A',
  },
];

/* ───── Component ───── */
const HomePage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section id="home" className="hero-section">
        {/* Animated Background Blobs */}
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="hero-blob blob-3" />

        <div className="container hero-container">
          <div className="row align-items-center g-5">

            {/* ── Left: Text ── */}
            <div className="col-lg-6 hero-text" data-aos="fade-right">
              <div className="hero-badge">
                <span className="badge-dot" />
                🎓 Smart Finance for Students 16+
              </div>
              <h1 className="hero-title">
                Take Control of Your <span className="highlight">Budget</span> Today
              </h1>
              <p className="hero-subtitle">
                BudgetBuddy helps you track daily expenses, plan monthly budgets, set savings goals, and build smarter financial habits — all in one beautiful dashboard.
              </p>

              {/* FREE Banner */}
              <div className="free-banner">
                <span className="free-tag">🎉 100% FREE</span>
                <span>No credit card · No hidden charges · Always free for students</span>
              </div>

              <div className="hero-actions">
                <Link to="/register" className="btn-hero-primary">
                  Get Started — It's Free <FaArrowRight />
                </Link>
                <button
                  className="btn-hero-outline"
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  See Features
                </button>
              </div>
              <div className="hero-social-proof">
                <div className="proof-avatars">
                  {['P','R','A','S','M'].map((l, i) => (
                    <div className="proof-avatar" key={i}>{l}</div>
                  ))}
                </div>
                <span><strong>10,000+</strong> students already saving smarter</span>
              </div>
            </div>

            {/* ── Right: Dashboard Preview ── */}
            <div className="col-lg-6 hero-visual">
              <div className="dashboard-card">
                {/* Card Header */}
                <div className="dc-header">
                  <div className="dc-dots">
                    <span style={{ background: '#ef4444' }} />
                    <span style={{ background: '#f59e0b' }} />
                    <span style={{ background: '#10b981' }} />
                  </div>
                  <span>BudgetBuddy Dashboard</span>
                </div>

                {/* Welcome */}
                <div className="dc-welcome">
                  <div>
                    <p className="dc-greeting">Hi, Welcome Back 👋</p>
                    <p className="dc-name">Priya Sharma</p>
                  </div>
                  <div className="dc-month-badge">July 2026</div>
                </div>

                {/* Budget Summary */}
                <div className="dc-budget-row">
                  <div className="dc-budget-box green">
                    <span className="dc-box-label">Total Budget</span>
                    <span className="dc-box-value">₹8,000</span>
                  </div>
                  <div className="dc-budget-box red">
                    <span className="dc-box-label">Total Spent</span>
                    <span className="dc-box-value">-₹4,200</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="dc-progress-section">
                  <div className="dc-progress-bar">
                    <div className="dc-progress-fill" style={{ width: '52.5%' }} />
                  </div>
                  <div className="dc-progress-labels">
                    <span>52.5% used</span>
                    <span className="dc-remaining">₹3,800 remaining</span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="dc-categories">
                  {[
                    { label: 'Food',     amount: '₹1,200', pct: 28, color: '#F44336' },
                    { label: 'Travel',   amount: '₹800',   pct: 19, color: '#2196F3' },
                    { label: 'Shopping', amount: '₹1,600', pct: 38, color: '#E91E63' },
                    { label: 'Books',    amount: '₹600',   pct: 14, color: '#00C853' },
                  ].map((cat) => (
                    <div className="dc-cat-row" key={cat.label}>
                      <span className="dc-cat-dot" style={{ background: cat.color }} />
                      <span className="dc-cat-name">{cat.label}</span>
                      <div className="dc-cat-bar">
                        <div className="dc-cat-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
                      </div>
                      <span className="dc-cat-amt">{cat.amount}</span>
                    </div>
                  ))}
                </div>

                {/* Savings Goal */}
                <div className="dc-savings">
                  <FaBullseye style={{ color: '#00C853' }} />
                  <span>Savings Goal</span>
                  <strong>₹2,000 / ₹5,000</strong>
                  <div className="dc-savings-bar">
                    <div className="dc-savings-fill" style={{ width: '40%' }} />
                  </div>
                  <span className="dc-savings-pct">40%</span>
                </div>

                {/* Alert */}
                <div className="dc-alert">
                  <FaBell />
                  <span>30% of your expenses limit found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-3 justify-content-center">
            {stats.map((s, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="stat-card">
                  <h3 className="stat-value">{s.value}</h3>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-head">
            <span className="sec-badge">Why BudgetBuddy?</span>
            <h2 className="sec-title">
              Everything You Need to <span className="highlight">Stay on Budget</span>
            </h2>
            <p className="sec-sub">
              Powerful tools designed for student life — simple, effective, and always free.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="feature-card">
                  <div className="feature-icon" style={{ background: `${f.color}18`, color: f.color }}>
                    {f.icon}
                  </div>
                  <h5 className="feature-title">{f.title}</h5>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CATEGORIES ══════════════ */}
      <section className="categories-section">
        <div className="container">
          <div className="section-head">
            <span className="sec-badge">Expense Categories</span>
            <h2 className="sec-title">
              Track Spending Across <span className="highlight">7 Categories</span>
            </h2>
            <p className="sec-sub">
              Every rupee organised — add expenses under the right category in seconds.
            </p>
          </div>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <div className="cat-chip" key={i} style={{ background: cat.bg, borderColor: cat.color }}>
                <div className="cat-icon" style={{ color: cat.color }}>{cat.icon}</div>
                <span style={{ color: cat.color, fontWeight: 600 }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="how-section">
        <div className="container">
          <div className="section-head">
            <span className="sec-badge">How It Works</span>
            <h2 className="sec-title">
              Get Started in <span className="highlight">3 Simple Steps</span>
            </h2>
          </div>

          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="steps-list">
                {[
                  { n: '01', title: 'Create Your Account',    desc: 'Sign up for free in under a minute. No credit card needed.' },
                  { n: '02', title: 'Set Your Monthly Budget', desc: 'Enter your planned monthly budget and let BudgetBuddy track the rest.' },
                  { n: '03', title: 'Log Daily Expenses',     desc: 'Add expenses under categories, view charts, and stay on track.' },
                ].map((s) => (
                  <div className="step-row" key={s.n}>
                    <div className="step-num">{s.n}</div>
                    <div className="step-body">
                      <h5>{s.title}</h5>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="checklist-card">
                <h4>What's included in BudgetBuddy</h4>
                {[
                  'Real-time remaining budget display',
                  'Daily and monthly expense logs',
                  'Pie & bar charts for spending analysis',
                  'Budget overspend alerts & notifications',
                  'Savings goal progress tracker',
                  'Complete expense history with filters',
                  'Secure profile & account management',
                ].map((item, i) => (
                  <div className="check-row" key={i}>
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
                <Link to="/register" className="btn-hero-primary mt-4" style={{ display: 'inline-flex' }}>
                  Start Tracking Free <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-head">
            <span className="sec-badge">Student Reviews</span>
            <h2 className="sec-title">Loved by <span className="highlight">Students</span></h2>
          </div>

          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="testi-card">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-stars">
                    {Array(t.rating).fill(0).map((_, j) => <FaStar key={j} />)}
                  </div>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.avatar}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.college}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-icon-grid">
                {[
                  { icon: <FaWallet />,    label: 'Budget',   color: '#00C853' },
                  { icon: <FaChartPie />,  label: 'Charts',   color: '#00BCD4' },
                  { icon: <FaBullseye />,  label: 'Goals',    color: '#FF9800' },
                  { icon: <FaBell />,      label: 'Alerts',   color: '#F44336' },
                  { icon: <FaHistory />,   label: 'History',  color: '#7C4DFF' },
                  { icon: <FaMobileAlt />, label: 'Mobile',   color: '#1DE9B6' },
                ].map((item, i) => (
                  <div className="about-card" key={i} style={{ borderColor: `${item.color}40` }}>
                    <div style={{ color: item.color, fontSize: '2rem' }}>{item.icon}</div>
                    <span style={{ color: item.color, fontWeight: 600 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <span className="sec-badge">About BudgetBuddy</span>
              <h2 className="sec-title mt-3">
                Smart Finance for the <span className="highlight">Next Generation</span>
              </h2>
              <p className="about-text">
                BudgetBuddy was built with one mission — help students aged 16+ develop healthy financial habits. College life brings tight budgets, hostel costs, books, travel, and lots of unplanned spending.
              </p>
              <p className="about-text">
                Our platform gives you a complete picture of your finances through intuitive charts, real-time tracking, and smart alerts. Whether you receive a monthly allowance or a stipend, BudgetBuddy helps every rupee count.
              </p>
              <div className="tech-tags">
                {['React.js', 'Python Flask', 'MySQL', 'Chart.js', 'Bootstrap 5'].map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="cta-section">
        <div className="cta-inner container text-center">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of students who track smarter with BudgetBuddy — completely free.</p>
          <div className="cta-btns">
            <Link to="/register" className="btn-hero-primary">
              Create Free Account <FaArrowRight />
            </Link>
            <Link to="/login" className="btn-cta-outline">
              Already Have an Account
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-head">
            <span className="sec-badge">Get in Touch</span>
            <h2 className="sec-title">Contact <span className="highlight">Us</span></h2>
            <p className="sec-sub">Have a question or suggestion? We'd love to hear from you.</p>
          </div>

          <div className="row g-5 justify-content-center">
            {/* Info */}
            <div className="col-lg-4">
              <div className="contact-info-box">
                {[
                  { icon: <FaEnvelope />, title: 'Email Us', detail: 'support@budgetbuddy.in' },
                  { icon: <FaMapMarkerAlt />, title: 'Location', detail: 'India' },
                  { icon: <FaMobileAlt />, title: 'Response Time', detail: 'Within 24 hours' },
                ].map((item, i) => (
                  <div className="contact-info-row" key={i}>
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7">
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitted && (
                  <div className="form-success-msg">
                    <FaCheckCircle /> Message sent! We'll reply within 24 hours.
                  </div>
                )}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text" className="form-control bb-input"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email" className="form-control bb-input"
                      placeholder="e.g. rahul@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control bb-input" rows={5}
                      placeholder="Write your message..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-hero-primary w-100 justify-content-center">
                      Send Message <FaArrowRight />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
