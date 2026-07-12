import React from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bb-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <div className="footer-logo"><FaWallet /></div>
                <span>Budget<strong>Buddy</strong></span>
              </div>
              <p className="footer-desc">
                Smart expense & budget management for students aged 16+. Track every rupee, hit your savings goals, and build better financial habits.
              </p>
              <div className="footer-socials">
                <a href="#!" aria-label="Facebook"><FaFacebook /></a>
                <a href="#!" aria-label="Twitter"><FaTwitter /></a>
                <a href="#!" aria-label="Instagram"><FaInstagram /></a>
                <a href="#!" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="footer-list">
                <li><button onClick={() => scrollTo('home')}>Home</button></li>
                <li><button onClick={() => scrollTo('features')}>Features</button></li>
                <li><button onClick={() => scrollTo('about')}>About</button></li>
                <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
              </ul>
            </div>

            {/* Features */}
            <div className="col-lg-3 col-md-6">
              <h6 className="footer-heading">Features</h6>
              <ul className="footer-list">
                <li><span>Expense Tracking</span></li>
                <li><span>Budget Planning</span></li>
                <li><span>Savings Goals</span></li>
                <li><span>Spending Charts</span></li>
                <li><span>Budget Alerts</span></li>
                <li><span>Expense History</span></li>
              </ul>
            </div>

            {/* Account */}
            <div className="col-lg-3 col-md-6">
              <h6 className="footer-heading">Account</h6>
              <ul className="footer-list">
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/login">Sign In</Link></li>
              </ul>
              <div className="footer-student-badge">🎓 Built for Students 16+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} BudgetBuddy — Made with <FaHeart className="heart" /> for students
          </p>
          <div className="footer-bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
