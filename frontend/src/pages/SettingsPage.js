import React, { useState } from 'react';
import { FaMoon, FaBell, FaClock, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    reminderTime: '20:00',
    currency: '₹',
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setSettings(s => ({...s, [key]: !s[key]}));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Settings</h2>
          <p className="page-sub">Customize your BudgetBuddy experience</p>
        </div>

        {saved && <div className="success-toast"><FaCheckCircle /> Settings saved!</div>}

        <div className="row justify-content-center">
          <div className="col-lg-7">

            {/* Dark Mode */}
            <div className="inner-card setting-card">
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-icon dark"><FaMoon /></div>
                  <div>
                    <h6>Dark Mode</h6>
                    <p>Switch to a dark theme for low-light usage</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.darkMode} onChange={() => toggle('darkMode')} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="inner-card setting-card">
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-icon green"><FaBell /></div>
                  <div>
                    <h6>Notifications</h6>
                    <p>Receive budget alerts and spending reminders</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.notifications} onChange={() => toggle('notifications')} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>

            {/* Reminder Time */}
            <div className="inner-card setting-card">
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-icon orange"><FaClock /></div>
                  <div>
                    <h6>Daily Reminder Time</h6>
                    <p>Get reminded to log your daily expenses</p>
                  </div>
                </div>
                <input type="time" className="time-input"
                  value={settings.reminderTime}
                  disabled={!settings.notifications}
                  onChange={e => setSettings(s => ({...s, reminderTime: e.target.value}))} />
              </div>
              {!settings.notifications && <p className="setting-note">Enable notifications to set reminder time</p>}
            </div>

            {/* Currency */}
            <div className="inner-card setting-card">
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-icon purple"><FaRupeeSign /></div>
                  <div>
                    <h6>Currency</h6>
                    <p>Select your preferred currency symbol</p>
                  </div>
                </div>
                <select className="currency-select"
                  value={settings.currency}
                  onChange={e => setSettings(s => ({...s, currency: e.target.value}))}>
                  <option value="₹">₹ Indian Rupee (INR)</option>
                  <option value="$">$ US Dollar (USD)</option>
                  <option value="€">€ Euro (EUR)</option>
                  <option value="£">£ British Pound (GBP)</option>
                </select>
              </div>
            </div>

            <button className="submit-btn w-100 justify-content-center mt-2" onClick={handleSave}>
              <FaCheckCircle /> Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
