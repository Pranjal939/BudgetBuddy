import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaWallet, FaHome, FaMoneyBillWave, FaPlusCircle,
  FaHistory, FaChartBar, FaBullseye, FaUserCircle,
  FaCog, FaQuestionCircle, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', icon: <FaHome />,          label: 'Dashboard' },
  { path: '/budget',    icon: <FaMoneyBillWave />,  label: 'Monthly Budget' },
  { path: '/add-expense', icon: <FaPlusCircle />,   label: 'Add Expense' },
  { path: '/expenses',  icon: <FaHistory />,        label: 'Expense History' },
  { path: '/reports',   icon: <FaChartBar />,       label: 'Reports' },
  { path: '/goals',     icon: <FaBullseye />,       label: 'Savings Goals' },
  { path: '/profile',   icon: <FaUserCircle />,     label: 'Profile' },
  { path: '/settings',  icon: <FaCog />,            label: 'Settings' },
  { path: '/contact',   icon: <FaQuestionCircle />, label: 'Help & Contact' },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-topbar">
        <Link to="/dashboard" className="sb-brand">
          <div className="sb-brand-logo"><FaWallet /></div>
          <span>Budget<strong>Buddy</strong></span>
        </Link>
        <button className="sb-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sb-header">
          <Link to="/dashboard" className="sb-brand" onClick={() => setOpen(false)}>
            <div className="sb-brand-logo"><FaWallet /></div>
            <span>Budget<strong>Buddy</strong></span>
          </Link>
        </div>

        {/* User Info */}
        <div className="sb-user">
          <div className="sb-avatar">P</div>
          <div>
            <p className="sb-user-name">Priya Sharma</p>
            <p className="sb-user-email">priya@email.com</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="sb-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sb-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="sb-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="sb-footer">
          <Link to="/" className="sb-logout">
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Overlay on mobile */}
      {open && <div className="sb-overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Sidebar;
