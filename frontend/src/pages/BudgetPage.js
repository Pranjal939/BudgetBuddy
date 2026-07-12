import React, { useState } from 'react';
import { FaMoneyBillWave, FaPiggyBank, FaEdit, FaCheckCircle, FaRedo } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const BudgetPage = () => {
  const currentMonth = months[new Date().getMonth()];
  const [budget, setBudget] = useState(8000);
  const [savingsGoal, setSavingsGoal] = useState(2000);
  const [editBudget, setEditBudget] = useState(false);
  const [editGoal, setEditGoal] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget);
  const [tempGoal, setTempGoal] = useState(savingsGoal);
  const [saved, setSaved] = useState(false);

  const totalExpense = 4200;
  const remaining = budget - totalExpense;
  const usedPct = Math.min(100, Math.round((totalExpense / budget) * 100));
  const goalPct = Math.min(100, Math.round(((budget - totalExpense) / savingsGoal) * 100));

  const handleSave = () => {
    setBudget(Number(tempBudget));
    setSavingsGoal(Number(tempGoal));
    setEditBudget(false);
    setEditGoal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Monthly Budget</h2>
          <p className="page-sub">Manage your budget for <strong>{currentMonth} {new Date().getFullYear()}</strong></p>
        </div>

        {saved && <div className="success-toast"><FaCheckCircle /> Budget updated successfully!</div>}

        <div className="row g-4">
          {/* Budget Card */}
          <div className="col-lg-6">
            <div className="inner-card">
              <div className="inner-card-head">
                <div className="inner-card-icon green"><FaMoneyBillWave /></div>
                <h5>Monthly Budget</h5>
                <button className="edit-btn" onClick={() => setEditBudget(!editBudget)}><FaEdit /></button>
              </div>
              {editBudget ? (
                <div className="budget-edit">
                  <label>Set Budget Amount (₹)</label>
                  <input type="number" className="budget-input" value={tempBudget} min={0}
                    onChange={(e) => setTempBudget(e.target.value)} />
                </div>
              ) : (
                <div className="budget-display">
                  <span className="budget-big">₹{budget.toLocaleString('en-IN')}</span>
                  <span className="budget-label">Budget for {currentMonth}</span>
                </div>
              )}
              <div className="budget-bar-section">
                <div className="bbar"><div className="bbar-fill" style={{ width:`${usedPct}%`, background: usedPct>80?'#ef4444':'#00C853' }} /></div>
                <div className="bbar-labels">
                  <span>Used: ₹{totalExpense.toLocaleString('en-IN')} ({usedPct}%)</span>
                  <span className={remaining < 0 ? 'text-red' : 'text-green'}>
                    {remaining < 0 ? `Over by ₹${Math.abs(remaining)}` : `₹${remaining.toLocaleString('en-IN')} left`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Goal Card */}
          <div className="col-lg-6">
            <div className="inner-card">
              <div className="inner-card-head">
                <div className="inner-card-icon purple"><FaPiggyBank /></div>
                <h5>Savings Goal</h5>
                <button className="edit-btn" onClick={() => setEditGoal(!editGoal)}><FaEdit /></button>
              </div>
              {editGoal ? (
                <div className="budget-edit">
                  <label>Set Savings Goal (₹)</label>
                  <input type="number" className="budget-input" value={tempGoal} min={0}
                    onChange={(e) => setTempGoal(e.target.value)} />
                </div>
              ) : (
                <div className="budget-display">
                  <span className="budget-big">₹{savingsGoal.toLocaleString('en-IN')}</span>
                  <span className="budget-label">Savings target this month</span>
                </div>
              )}
              <div className="budget-bar-section">
                <div className="bbar"><div className="bbar-fill" style={{ width:`${goalPct}%`, background:'#7C4DFF' }} /></div>
                <div className="bbar-labels">
                  <span>Saved: ₹{Math.max(0,remaining).toLocaleString('en-IN')}</span>
                  <span className="text-purple">{goalPct}% of goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {(editBudget || editGoal) && (
          <div className="save-row">
            <button className="save-btn" onClick={handleSave}><FaCheckCircle /> Save Changes</button>
            <button className="cancel-btn" onClick={() => { setEditBudget(false); setEditGoal(false); }}>Cancel</button>
          </div>
        )}

        {/* Monthly Summary Table */}
        <div className="inner-card mt-4">
          <h5 className="mb-4" style={{ color:'#004D40', fontWeight:800 }}>Monthly Summary</h5>
          <div className="summary-table">
            {[
              { label:'Month',          value: currentMonth, icon:'📅' },
              { label:'Monthly Budget', value:`₹${budget.toLocaleString('en-IN')}`, icon:'💰' },
              { label:'Total Spent',    value:`₹${totalExpense.toLocaleString('en-IN')}`, icon:'📉' },
              { label:'Remaining',      value:`₹${Math.max(0,remaining).toLocaleString('en-IN')}`, icon:'💵' },
              { label:'Savings Goal',   value:`₹${savingsGoal.toLocaleString('en-IN')}`, icon:'🎯' },
              { label:'Budget Used',    value:`${usedPct}%`, icon:'📊' },
            ].map((row,i) => (
              <div className="summary-row" key={i}>
                <span className="summary-icon">{row.icon}</span>
                <span className="summary-label">{row.label}</span>
                <span className="summary-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Reset Note */}
        <div className="reset-note">
          <FaRedo />
          <span>Your budget automatically resets at the start of each new month.</span>
        </div>
      </main>
    </div>
  );
};

export default BudgetPage;
