import React, { useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes,
  FaUniversity, FaMoneyBillWave, FaMobileAlt, FaWallet,
  FaExchangeAlt, FaArrowRight
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';
import './AccountsPage.css';

/* ── Account Type Config ── */
const accountTypes = [
  { type: 'Bank Account', icon: <FaUniversity />,    color: '#2196F3', bg: '#e3f2fd' },
  { type: 'Cash',         icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' },
  { type: 'UPI / Wallet', icon: <FaMobileAlt />,     color: '#FF9800', bg: '#fff3e0' },
];

const accountIcons = {
  'SBI Savings':  { icon: <FaUniversity />,    color: '#2196F3', bg: '#e3f2fd' },
  'HDFC Savings': { icon: <FaUniversity />,    color: '#ef4444', bg: '#fde8e8' },
  'ICICI Bank':   { icon: <FaUniversity />,    color: '#F97316', bg: '#fff7ed' },
  'Cash':         { icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' },
  'Google Pay':   { icon: <FaMobileAlt />,     color: '#4285F4', bg: '#e8f0fe' },
  'PhonePe':      { icon: <FaMobileAlt />,     color: '#6739B7', bg: '#ede7f6' },
  'Paytm':        { icon: <FaWallet />,        color: '#00B9F1', bg: '#e0f7fa' },
};

const getAccIcon = (name, type) => {
  if (accountIcons[name]) return accountIcons[name];
  if (type === 'Bank Account') return { icon: <FaUniversity />,    color: '#2196F3', bg: '#e3f2fd' };
  if (type === 'Cash')         return { icon: <FaMoneyBillWave />, color: '#00C853', bg: '#e8f5e9' };
  return { icon: <FaMobileAlt />, color: '#FF9800', bg: '#fff3e0' };
};

/* ── Sample Data ── */
const initialAccounts = [
  { id: 1, name: 'SBI Savings', type: 'Bank Account', balance: 12500 },
  { id: 2, name: 'Cash',        type: 'Cash',         balance: 1800  },
  { id: 3, name: 'Google Pay',  type: 'UPI / Wallet', balance: 3200  },
  { id: 4, name: 'PhonePe',     type: 'UPI / Wallet', balance: 750   },
];

const initialActivity = [
  { from: null,         to: 'Google Pay',  desc: 'Paid for Lunch',       amount: -120,  date: '2026-07-12', type: 'expense'  },
  { from: null,         to: 'SBI Savings', desc: 'Monthly Budget Added',  amount: +8000, date: '2026-07-01', type: 'credit'   },
  { from: null,         to: 'Cash',        desc: 'Auto-rickshaw fare',    amount: -50,   date: '2026-07-11', type: 'expense'  },
  { from: null,         to: 'PhonePe',     desc: 'Mobile Recharge',       amount: -299,  date: '2026-07-08', type: 'expense'  },
];

const AccountsPage = () => {
  const [accounts, setAccounts]       = useState(initialAccounts);
  const [activity, setActivity]       = useState(initialActivity);
  const [showForm, setShowForm]       = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [editId, setEditId]           = useState(null);
  const [deleteId, setDeleteId]       = useState(null);
  const [toast, setToast]             = useState('');
  const [form, setForm]               = useState({ name: '', type: 'Bank Account', balance: '' });
  const [transfer, setTransfer]       = useState({ from: '', to: '', amount: '', note: '' });
  const [transferErr, setTransferErr] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const quickNames   = ['SBI Savings','HDFC Savings','ICICI Bank','Cash','Google Pay','PhonePe','Paytm'];

  /* ── Add / Edit Account ── */
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

  /* ── Transfer Money ── */
  const handleTransfer = (e) => {
    e.preventDefault();
    setTransferErr('');
    const amt = Number(transfer.amount);
    if (transfer.from === transfer.to) { setTransferErr('From and To accounts must be different.'); return; }
    if (amt <= 0)                      { setTransferErr('Enter a valid transfer amount.'); return; }
    const fromAcc = accounts.find(a => a.name === transfer.from);
    if (fromAcc.balance < amt)         { setTransferErr(`Insufficient balance in ${transfer.from}. Available: ₹${fromAcc.balance}`); return; }

    /* Update balances */
    setAccounts(accounts.map(a => {
      if (a.name === transfer.from) return { ...a, balance: a.balance - amt };
      if (a.name === transfer.to)   return { ...a, balance: a.balance + amt };
      return a;
    }));

    const today = new Date().toISOString().split('T')[0];

    /* Add to activity log */
    setActivity([
      { from: transfer.from, to: transfer.to, desc: `Transfer: ${transfer.from} → ${transfer.to}${transfer.note ? ` (${transfer.note})` : ''}`, amount: -amt, date: today, type: 'transfer' },
      ...activity,
    ]);

    showToast(`✅ ₹${amt.toLocaleString('en-IN')} transferred from ${transfer.from} to ${transfer.to}`);
    setTransfer({ from: '', to: '', amount: '', note: '' });
    setShowTransfer(false);
  };

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
          <div style={{ display:'flex', gap:10 }}>
            <button className="transfer-btn" onClick={() => setShowTransfer(true)}>
              <FaExchangeAlt /> Transfer Money
            </button>
            <button className="db-add-btn" onClick={() => { setShowForm(true); setEditId(null); setForm({ name:'', type:'Bank Account', balance:'' }); }}>
              <FaPlus /> Add Account
            </button>
          </div>
        </div>

        {toast && <div className="success-toast"><FaCheckCircle /> {toast}</div>}

        {/* Total Balance Banner */}
        <div className="total-balance-card">
          <div>
            <p className="tb-label">Total Balance Across All Accounts</p>
            <h2 className="tb-value">₹{totalBalance.toLocaleString('en-IN')}</h2>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button className="tb-transfer-btn" onClick={() => setShowTransfer(true)}>
              <FaExchangeAlt /> Transfer
            </button>
            <div className="tb-accounts-count">{accounts.length} Accounts</div>
          </div>
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
                    <button className="action-btn edit"   onClick={() => handleEdit(acc)}><FaEdit /></button>
                    <button className="action-btn delete" onClick={() => setDeleteId(acc.id)}><FaTrash /></button>
                  </div>
                </div>
                <h5 className="acc-name">{acc.name}</h5>
                <span className="acc-type-badge" style={{ background: bg, color }}>{acc.type}</span>
                <div className="acc-balance">
                  <span className="acc-balance-label">Balance</span>
                  <span className="acc-balance-value" style={{ color }}>₹{acc.balance.toLocaleString('en-IN')}</span>
                </div>
                <div className="acc-bar">
                  <div className="acc-bar-fill" style={{ width:`${Math.min(100,(acc.balance/totalBalance)*100)}%`, background:color }} />
                </div>
                <span className="acc-bar-pct" style={{ color }}>{((acc.balance/totalBalance)*100).toFixed(1)}% of total</span>
              </div>
            );
          })}
          <div className="account-card acc-add-card"
            onClick={() => { setShowForm(true); setEditId(null); setForm({ name:'', type:'Bank Account', balance:'' }); }}>
            <FaPlus className="acc-add-icon" />
            <p>Add New Account</p>
          </div>
        </div>

        {/* Account Type Summary */}
        <div className="row g-4 mt-2">
          {accountTypes.map(at => {
            const total = accounts.filter(a => a.type === at.type).reduce((s,a)=>s+a.balance,0);
            const count = accounts.filter(a => a.type === at.type).length;
            return (
              <div className="col-md-4" key={at.type}>
                <div className="inner-card acc-summary-card" style={{ borderLeft:`4px solid ${at.color}` }}>
                  <div className="acc-sum-icon" style={{ background:at.bg, color:at.color }}>{at.icon}</div>
                  <div>
                    <p className="acc-sum-label">{at.type}</p>
                    <h4 className="acc-sum-value" style={{ color:at.color }}>₹{total.toLocaleString('en-IN')}</h4>
                    <span className="acc-sum-count">{count} account{count!==1?'s':''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="inner-card mt-4">
          <h5 style={{ color:'#004D40', fontWeight:800, marginBottom:16 }}>Recent Account Activity</h5>
          <div className="recent-list">
            {activity.map((item, i) => {
              const { icon, color, bg } = getAccIcon(item.to, '');
              return (
                <div className="recent-item" key={i}>
                  <div className="recent-icon" style={{ background: item.type==='transfer' ? '#e8f5e9' : bg, color: item.type==='transfer' ? '#00C853' : color }}>
                    {item.type === 'transfer' ? <FaExchangeAlt /> : icon}
                  </div>
                  <div className="recent-info">
                    <p className="recent-name">{item.desc}</p>
                    <span className="recent-meta">
                      {item.type === 'transfer'
                        ? `${item.from} → ${item.to} • ${item.date}`
                        : `${item.to} • ${item.date}`}
                    </span>
                  </div>
                  <span className={`recent-amount ${item.amount > 0 ? 'amount-credit' : ''}`}>
                    {item.amount > 0 ? '+' : ''}₹{Math.abs(item.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════ TRANSFER MONEY MODAL ════ */}
        {showTransfer && (
          <div className="modal-overlay">
            <div className="modal-box modal-lg">
              <div className="modal-header">
                <h5><FaExchangeAlt style={{ color:'#00C853', marginRight:8 }} />Transfer Money</h5>
                <button className="modal-close" onClick={() => { setShowTransfer(false); setTransferErr(''); }}><FaTimes /></button>
              </div>

              {transferErr && <div className="transfer-err">{transferErr}</div>}

              <form onSubmit={handleTransfer}>
                {/* From / To Row */}
                <div className="transfer-flow-row">
                  <div className="transfer-side">
                    <label>Transfer From</label>
                    <select className="bb-form-input" value={transfer.from}
                      onChange={e => setTransfer({ ...transfer, from: e.target.value })} required>
                      <option value="">-- Select Account --</option>
                      {accounts.map(a => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.type}) — ₹{a.balance.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>
                    {transfer.from && (
                      <div className="transfer-acc-preview">
                        <div className="tap-icon" style={{ background: getAccIcon(transfer.from,'').bg, color: getAccIcon(transfer.from,'').color }}>
                          {getAccIcon(transfer.from,'').icon}
                        </div>
                        <div>
                          <strong>{transfer.from}</strong>
                          <span className="tap-type">{accounts.find(a=>a.name===transfer.from)?.type}</span>
                          <span className="tap-balance">Available Balance: <strong>₹{(accounts.find(a=>a.name===transfer.from)?.balance||0).toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="transfer-arrow"><FaArrowRight /></div>

                  <div className="transfer-side">
                    <label>Transfer To</label>
                    <select className="bb-form-input" value={transfer.to}
                      onChange={e => setTransfer({ ...transfer, to: e.target.value })} required>
                      <option value="">-- Select Account --</option>
                      {accounts.filter(a => a.name !== transfer.from).map(a => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.type}) — ₹{a.balance.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>
                    {transfer.to && (
                      <div className="transfer-acc-preview">
                        <div className="tap-icon" style={{ background: getAccIcon(transfer.to,'').bg, color: getAccIcon(transfer.to,'').color }}>
                          {getAccIcon(transfer.to,'').icon}
                        </div>
                        <div>
                          <strong>{transfer.to}</strong>
                          <span className="tap-type">{accounts.find(a=>a.name===transfer.to)?.type}</span>
                          <span className="tap-balance">Available Balance: <strong>₹{(accounts.find(a=>a.name===transfer.to)?.balance||0).toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="form-group-bb mt-3">
                  <label>Amount (₹)</label>
                  <input type="number" className="bb-form-input" placeholder="Enter amount to transfer"
                    value={transfer.amount} min={1}
                    onChange={e => setTransfer({ ...transfer, amount: e.target.value })} required />
                  {transfer.from && transfer.amount && (
                    <p className="transfer-after-note">
                      After transfer: <strong>{transfer.from}</strong> will have ₹{Math.max(0, (accounts.find(a=>a.name===transfer.from)?.balance||0) - Number(transfer.amount)).toLocaleString('en-IN')}
                      {transfer.to && <> &nbsp;|&nbsp; <strong>{transfer.to}</strong> will have ₹{((accounts.find(a=>a.name===transfer.to)?.balance||0) + Number(transfer.amount)).toLocaleString('en-IN')}</>}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div className="form-group-bb">
                  <label>Note <span className="optional">(optional)</span></label>
                  <input type="text" className="bb-form-input" placeholder="e.g. For college fees"
                    value={transfer.note}
                    onChange={e => setTransfer({ ...transfer, note: e.target.value })} />
                </div>

                <div className="modal-btns">
                  <button type="submit" className="submit-btn">
                    <FaExchangeAlt /> Transfer Money
                  </button>
                  <button type="button" className="cancel-btn"
                    onClick={() => { setShowTransfer(false); setTransferErr(''); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add / Edit Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-header">
                <h5>{editId ? 'Edit Account' : 'Add New Account'}</h5>
                <button className="modal-close" onClick={() => { setShowForm(false); setEditId(null); }}><FaTimes /></button>
              </div>
              <form onSubmit={handleSubmit}>
                {!editId && (
                  <div className="form-group-bb">
                    <label>Quick Select</label>
                    <div className="quick-names">
                      {quickNames.map(n => (
                        <button type="button" key={n}
                          className={`quick-name-btn ${form.name===n?'selected':''}`}
                          onClick={() => {
                            const t = ['Google Pay','PhonePe','Paytm'].includes(n) ? 'UPI / Wallet' : n==='Cash' ? 'Cash' : 'Bank Account';
                            setForm({ ...form, name:n, type:t });
                          }}>{n}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="form-group-bb">
                  <label>Account Name</label>
                  <input type="text" className="bb-form-input" placeholder="e.g. SBI Savings, Google Pay"
                    value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                </div>
                <div className="form-group-bb">
                  <label>Account Type</label>
                  <select className="bb-form-input" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                    <option>Bank Account</option>
                    <option>Cash</option>
                    <option>UPI / Wallet</option>
                  </select>
                </div>
                <div className="form-group-bb">
                  <label>Current Balance (₹)</label>
                  <input type="number" className="bb-form-input" placeholder="Enter current balance"
                    value={form.balance} min={0} onChange={e => setForm({...form, balance:e.target.value})} required />
                </div>
                <div className="modal-btns">
                  <button type="submit" className="submit-btn">
                    <FaCheckCircle /> {editId ? 'Update Account' : 'Add Account'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h5>Delete Account?</h5>
              <p style={{ color:'#6b7280', marginTop:8 }}>This will remove the account permanently.</p>
              <div className="modal-btns" style={{ marginTop:20 }}>
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
