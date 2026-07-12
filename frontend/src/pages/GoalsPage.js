import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const initialGoals = [
  { id:1, title:'Buy Laptop',      target:50000, saved:18000, emoji:'💻', deadline:'2026-12-31' },
  { id:2, title:'Emergency Fund',  target:10000, saved:4500,  emoji:'🛡️', deadline:'2026-09-30' },
  { id:3, title:'New Smartphone',  target:20000, saved:7000,  emoji:'📱', deadline:'2026-11-30' },
];

const GoalsPage = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title:'', target:'', saved:'', emoji:'🎯', deadline:'' });

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setGoals(goals.map(g => g.id===editId ? {...form, id:editId, target:Number(form.target), saved:Number(form.saved)} : g));
      showToast('Goal updated!');
    } else {
      setGoals([...goals, {...form, id:Date.now(), target:Number(form.target), saved:Number(form.saved)}]);
      showToast('Goal created!');
    }
    setForm({ title:'', target:'', saved:'', emoji:'🎯', deadline:'' });
    setShowForm(false); setEditId(null);
  };

  const handleEdit = (g) => {
    setForm({ title:g.title, target:g.target, saved:g.saved, emoji:g.emoji, deadline:g.deadline });
    setEditId(g.id); setShowForm(true);
  };

  const handleDelete = (id) => { setGoals(goals.filter(g=>g.id!==id)); showToast('Goal deleted.'); };

  const emojis = ['🎯','💻','📱','🚗','✈️','🏠','📚','🛡️','🎓','💰'];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h2 className="page-title">Savings Goals</h2>
            <p className="page-sub">Set goals, track progress, achieve your dreams</p>
          </div>
          <button className="db-add-btn" onClick={() => { setShowForm(true); setEditId(null); setForm({title:'',target:'',saved:'',emoji:'🎯',deadline:''}); }}>
            <FaPlus /> Add Goal
          </button>
        </div>

        {toast && <div className="success-toast"><FaCheckCircle /> {toast}</div>}

        {/* Goals Grid */}
        <div className="goals-grid">
          {goals.map(g => {
            const pct = Math.min(100, Math.round((g.saved/g.target)*100));
            const remaining = g.target - g.saved;
            const done = pct >= 100;
            return (
              <div className={`goal-card ${done?'goal-done':''}`} key={g.id}>
                <div className="goal-card-header">
                  <span className="goal-emoji">{g.emoji}</span>
                  <div className="goal-actions">
                    <button className="action-btn edit" onClick={()=>handleEdit(g)}><FaEdit /></button>
                    <button className="action-btn delete" onClick={()=>handleDelete(g.id)}><FaTrash /></button>
                  </div>
                </div>
                <h5 className="goal-title">{g.title}</h5>
                {g.deadline && <p className="goal-deadline">🗓️ Target: {g.deadline}</p>}
                <div className="goal-amounts">
                  <span>Saved: <strong>₹{g.saved.toLocaleString('en-IN')}</strong></span>
                  <span>Target: <strong>₹{g.target.toLocaleString('en-IN')}</strong></span>
                </div>
                <div className="goal-bar">
                  <div className="goal-bar-fill" style={{ width:`${pct}%`, background: done?'#00C853':'#7C4DFF' }} />
                </div>
                <div className="goal-bar-labels">
                  <span className={done?'pct-ok':'text-purple'}>{done ? '🎉 Goal Achieved!' : `${pct}% Completed`}</span>
                  {!done && <span className="remaining-text">₹{remaining.toLocaleString('en-IN')} more needed</span>}
                </div>
              </div>
            );
          })}

          {/* Add New Card */}
          <div className="goal-card goal-add-card" onClick={() => { setShowForm(true); setEditId(null); }}>
            <FaPlus className="add-goal-icon" />
            <p>Add New Goal</p>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-box modal-lg">
              <div className="modal-header">
                <h5>{editId ? 'Edit Goal' : 'Create New Goal'}</h5>
                <button className="modal-close" onClick={() => { setShowForm(false); setEditId(null); }}><FaTimes /></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group-bb">
                  <label>Goal Title</label>
                  <input type="text" className="bb-form-input" placeholder="e.g. Buy Laptop"
                    value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="form-group-bb">
                      <label>Target Amount (₹)</label>
                      <input type="number" className="bb-form-input" placeholder="₹50,000"
                        value={form.target} min={1} onChange={e=>setForm({...form,target:e.target.value})} required />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group-bb">
                      <label>Already Saved (₹)</label>
                      <input type="number" className="bb-form-input" placeholder="₹0"
                        value={form.saved} min={0} onChange={e=>setForm({...form,saved:e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="form-group-bb">
                      <label>Target Deadline</label>
                      <input type="date" className="bb-form-input" value={form.deadline}
                        onChange={e=>setForm({...form,deadline:e.target.value})} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group-bb">
                      <label>Icon</label>
                      <div className="emoji-picker">
                        {emojis.map(em => (
                          <button type="button" key={em}
                            className={`emoji-btn ${form.emoji===em?'emoji-selected':''}`}
                            onClick={()=>setForm({...form,emoji:em})}>{em}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-btns">
                  <button type="submit" className="submit-btn">{editId?'Update Goal':'Create Goal'}</button>
                  <button type="button" className="cancel-btn" onClick={()=>{setShowForm(false);setEditId(null);}}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GoalsPage;
