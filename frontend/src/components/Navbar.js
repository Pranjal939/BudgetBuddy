import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`bb-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="bb-nav-inner">
        {/* Brand */}
        <Link to="/" className="bb-brand">
          <div className="brand-logo">
            <FaWallet />
          </div>
          <span>Budget<strong>Buddy</strong></span>
        </Link>

        {/* Desktop Links */}
        <ul className="bb-links">
          {['home','features','about','contact'].map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="bb-nav-auth">
          <Link to="/login" className="nav-btn-outline">Login</Link>
          <Link to="/register" className="nav-btn-fill">Join Free</Link>
        </div>

        {/* Hamburger */}
        <button className="bb-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="bb-mobile-menu">
          {['home','features','about','contact'].map(id => (
            <button key={id} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <div className="mobile-auth-row">
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="mobile-get-started">
              Join Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
