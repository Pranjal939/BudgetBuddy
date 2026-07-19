import React, { useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes,
  FaUniversity, FaMoneyBillWave, FaMobileAlt, FaWallet
} from 'react-icons/fa';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si'; // eslint-disable-line no-unused-vars
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';
import './AccountsPage.css';

/* ── Account Type Config ── */
const accountTypes = [
  { type: 'Bank Account', icon: <FaUniversity />, color: '#2196F3', bg: '#e3f2fd' },
  { type: 'Cash',         icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' },
  { type: 'UPI / Wallet', icon: <FaMobileAlt />,  color: '#FF9800', bg: '#fff3e0' },
];

const accountIcons = {
  'SBI Savings':   { icon: <FaUniversity />, color: '#2196F3', bg: '#e3f2fd' },
  'HDFC Savings':  { icon: <FaUniversity />, color: '#ef4444', bg: '#fde8e8' },
  'ICICI Bank':    { icon: <FaUniversity />, color: '#F97316', bg: '#fff7ed' },
  'Cash':          { icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' },
  'Google Pay':    { icon: <FaMobileAlt />, color: '#4285F4', bg: '#e8f0fe' },
  'PhonePe':       { icon: <FaMobileAlt />, color: '#6739B7', bg: '#ede7f6' },
  'Paytm':         { icon: <FaWallet />,    color: '#00B9F1', bg: '#e0f7fa' },
};

const getAccIcon = (name, type) => {
  if (accountIcons[name]) return accountIcons[name];
  if (type === 'Bank Account') return { icon: <FaUniversity />, color: '#2196F3', bg: '#e3f2fd' };
  if (type === 'Cash')         return { icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' };
  return { icon: <FaMobileAlt />, color: '#FF9800', bg: '#fff3e0' };
};

/* ── Sample Data ── */
const initialAccounts = [
  { id: 1, name: 'SBI Savings',  type: 'Bank Account', balance: 12500 },
  { id: 2, name: 'Cash',         type: 'Cash',         balance: 1800  },
  { id: 3, name: 'Google Pay',   type: 'UPI / Wallet', balance: 3200  },
  { id: 4, name: 'PhonePe',      type: 'UPI / Wallet', balance: 750   },
];

/* ── Recent Transfers ── */
const recentActivity = [
  { account: 'Google Pay',  desc: 'Paid for Lunch',      amount: -120, date: '2026-07-12' },
  { account: 'SBI Savings', desc: 'Monthly Budget Added', amount: +8000, date: '2026-07-01' },
  { account: 'Cash',        desc: 'Auto-rickshaw fare',   amount: -50,  date: '2026-07-11' },
  { account: 'PhonePe',     desc: 'Mobile Recharge',      amount: -299, date: '2026-07-08' },
];

const AccountsPage = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', type: 'Bank Account', balance: '' });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setAccounts(accounts.map(a =>
        a.id === editId ? { ...a, name: form.name, type: form.type, balance: Number(form.balance) } : a
      ));
      showToast('Account updated!');
    } else {
      setAccounts([...accounts, { id: Date.now(), name: form.name, type: form.type, balance: Number(form.balance) }]);
      showToast('Account added!');
    }
    setForm({ name: '', type: 'Bank Account', balance: '' });
    setShowForm(false); setEditId(null);
  };

  const handleEdit = (acc) => {
    setForm({ name: acc.name, type: acc.type, balance: acc.balance });
    setEditId(acc.id); setShowForm(true);
  };

  const handleDelete = (id) => {
    setAccounts(accounts.filter(a => a.id !== id));
    setDeleteId(null); showToast('Account deleted.');
  };

  const quickNames = ['SBI Savings', 'HDFC Savings', 'ICICI Bank', 'Cash', 'Google Pay', 'PhonePe', 'Paytm'];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">

        {/* Header */}
        <div className="page-header">
          <div>
            <h2 className="page-title">Accounts</h2>
            <p className="page-sub">Manage your bank accounts, cash and UPI wallets</p>
          </div>
          <button className="db-add-btn" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', type: 'Bank Account', balance: '' }); }}>
            <FaPlus /> Add Account
          </button>
        </div>

        {toast && <div className="success-toast"><FaCheckCircle /> {toast}</div>}

        {/* Total Balance Banner */}
        <div className="total-balance-card">
          <div>
            <p className="tb-label">Total Balance Across All Accounts</p>
            <h2 className="tb-value">₹{totalBalance.toLocaleString('en-IN')}</h2>
          </div>
          <div className="tb-accounts-count">{accounts.length} Accounts</div>
        </div>

        {/* Account Cards */}
        <div className="accounts-grid">
          {accounts.map(acc => {
            const { icon, color, bg } = getAccIcon(acc.name, acc.type);
            return (
              <div className="account-card" key={acc.id}>
                <div className="acc-card-top">
                  <div className="acc-icon" style={{ background: bg, color }}>{icon}</div>
                  <div className="acc-actions">
                    <button className="action-btn edit" onClick={() => handleEdit(acc)}><FaEdit /></button>
                    <button className="action-btn delete" onClick={() => setDeleteId(acc.id)}><FaTrash /></button>
                  </div>
                </div>
                <h5 className="acc-name">{acc.name}</h5>
                <span className="acc-type-badge" style={{ background: bg, color }}>{acc.type}</span>
                <div className="acc-balance">
                  <span className="acc-balance-label">Balance</span>
                  <span className="acc-balance-value" style={{ color }}>
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="acc-bar">
                  <div className="acc-bar-fill" style={{ width: `${Math.min(100, (acc.balance / totalBalance) * 100)}%`, background: color }} />
                </div>
                <span className="acc-bar-pct" style={{ color }}>
                  {((acc.balance / totalBalance) * 100).toFixed(1)}% of total
                </span>
              </div>
            );
          })}

          {/* Add New Card */}
          <div className="account-card acc-add-card"
            onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', type: 'Bank Account', balance: '' }); }}>
            <FaPlus className="acc-add-icon" />
            <p>Add New Account</p>
          </div>
        </div>

        {/* Account Type Summary */}
        <div className="row g-4 mt-2">
          {accountTypes.map(at => {
            const total = accounts.filter(a => a.type === at.type).reduce((s, a) => s + a.balance, 0);
            const count = accounts.filter(a => a.type === at.type).length;
            return (
              <div className="col-md-4" key={at.type}>
                <div className="inner-card acc-summary-card" style={{ borderLeft: `4px solid ${at.color}` }}>
                  <div className="acc-sum-icon" style={{ background: at.bg, color: at.color }}>{at.icon}</div>
                  <div>
                    <p className="acc-sum-label">{at.type}</p>
                    <h4 className="acc-sum-value" style={{ color: at.color }}>₹{total.toLocaleString('en-IN')}</h4>
                    <span className="acc-sum-count">{count} account{count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="inner-card mt-4">
          <h5 style={{ color: '#004D40', fontWeight: 800, marginBottom: 16 }}>Recent Account Activity</h5>
          <div className="recent-list">
            {recentActivity.map((item, i) => {
              const { icon, color, bg } = getAccIcon(item.account, '');
              return (
                <div className="recent-item" key={i}>
                  <div className="recent-icon" style={{ background: bg, color }}>{icon}</div>
                  <div className="recent-info">
                    <p className="recent-name">{item.desc}</p>
                    <span className="recent-meta">{item.account} • {item.date}</span>
                  </div>
                  <span className={`recent-amount ${item.amount > 0 ? 'amount-credit' : ''}`}>
                    {item.amount > 0 ? '+' : ''}₹{Math.abs(item.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-header">
                <h5>{editId ? 'Edit Account' : 'Add New Account'}</h5>
                <button className="modal-close" onClick={() => { setShowForm(false); setEditId(null); }}><FaTimes /></button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Quick Select */}
                {!editId && (
                  <div className="form-group-bb">
                    <label>Quick Select</label>
                    <div className="quick-names">
                      {quickNames.map(n => (
                        <button type="button" key={n}
                          className={`quick-name-btn ${form.name === n ? 'selected' : ''}`}
                          onClick={() => {
                            const t = ['Google Pay','PhonePe','Paytm'].includes(n) ? 'UPI / Wallet' : n === 'Cash' ? 'Cash' : 'Bank Account';
                            setForm({ ...form, name: n, type: t });
                          }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Account Name */}
                <div className="form-group-bb">
                  <label>Account Name</label>
                  <input type="text" className="bb-form-input"
                    placeholder="e.g. SBI Savings, Google Pay, Cash"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>

                {/* Account Type */}
                <div className="form-group-bb">
                  <label>Account Type</label>
                  <select className="bb-form-input" value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Bank Account</option>
                    <option>Cash</option>
                    <option>UPI / Wallet</option>
                  </select>
                </div>

                {/* Opening Balance */}
                <div className="form-group-bb">
                  <label>Current Balance (₹)</label>
                  <input type="number" className="bb-form-input"
                    placeholder="Enter current balance"
                    value={form.balance} min={0}
                    onChange={e => setForm({ ...form, balance: e.target.value })} required />
                </div>

                <div className="modal-btns">
                  <button type="submit" className="submit-btn">
                    <FaCheckCircle /> {editId ? 'Update Account' : 'Add Account'}
                  </button>
                  <button type="button" className="cancel-btn"
                    onClick={() => { setShowForm(false); setEditId(null); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h5>Delete Account?</h5>
              <p style={{ color: '#6b7280', marginTop: 8 }}>This will remove the account and cannot be undone.</p>
              <div className="modal-btns" style={{ marginTop: 20 }}>
                <button className="action-btn delete" onClick={() => handleDelete(deleteId)}>Yes, Delete</button>
                <button className="action-btn cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AccountsPage;
