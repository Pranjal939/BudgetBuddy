import React, { useState } from 'react';
import { FaPlusCircle, FaCheckCircle, FaUtensils, FaBus, FaBook, FaShoppingBag, FaFilm, FaPhone, FaHospital, FaBoxOpen } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const categories = [
  { id:'Food',          icon:<FaUtensils />,    color:'#F44336' },
  { id:'Travel',        icon:<FaBus />,         color:'#2196F3' },
  { id:'Books',         icon:<FaBook />,        color:'#00C853' },
  { id:'Shopping',      icon:<FaShoppingBag />, color:'#E91E63' },
  { id:'Entertainment', icon:<FaFilm />,        color:'#7C4DFF' },
  { id:'Recharge',      icon:<FaPhone />,       color:'#FF9800' },
  { id:'Medical',       icon:<FaHospital />,    color:'#00BCD4' },
  { id:'Others',        icon:<FaBoxOpen />,     color:'#9E9E9E' },
];

const paymentMethods = ['Cash','UPI','Debit Card','Credit Card','Net Banking'];

const AddExpensePage = () => {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ name:'', amount:'', category:'', method:'Cash', date:today, notes:'' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name     = 'Expense name is required';
    if (!form.amount || form.amount <= 0) e.amount = 'Enter a valid amount';
    if (!form.category)      e.category = 'Please select a category';
    if (!form.date)          e.date     = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setForm({ name:'', amount:'', category:'', method:'Cash', date:today, notes:'' });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Add Expense</h2>
          <p className="page-sub">Record a new expense to your budget tracker</p>
        </div>

        {success && <div className="success-toast"><FaCheckCircle /> Expense added successfully!</div>}

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="inner-card">
              <form onSubmit={handleSubmit}>

                {/* Expense Name */}
                <div className="form-group-bb">
                  <label>Expense Name <span className="req">*</span></label>
                  <input type="text" className={`bb-form-input ${errors.name?'input-err':''}`}
                    placeholder="e.g. Lunch at college canteen"
                    value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} />
                  {errors.name && <p className="err-text">{errors.name}</p>}
                </div>

                {/* Amount */}
                <div className="form-group-bb">
                  <label>Amount (₹) <span className="req">*</span></label>
                  <input type="number" className={`bb-form-input ${errors.amount?'input-err':''}`}
                    placeholder="Enter amount in ₹"
                    value={form.amount} min={1}
                    onChange={(e) => setForm({...form, amount:e.target.value})} />
                  {errors.amount && <p className="err-text">{errors.amount}</p>}
                </div>

                {/* Category */}
                <div className="form-group-bb">
                  <label>Category <span className="req">*</span></label>
                  <div className={`cat-select-grid ${errors.category?'cat-err':''}`}>
                    {categories.map(cat => (
                      <button type="button" key={cat.id}
                        className={`cat-select-btn ${form.category===cat.id?'selected':''}`}
                        style={form.category===cat.id ? {background:cat.color, borderColor:cat.color, color:'#fff'} : {borderColor:cat.color, color:cat.color}}
                        onClick={() => setForm({...form, category:cat.id})}>
                        <span>{cat.icon}</span>
                        <span>{cat.id}</span>
                      </button>
                    ))}
                  </div>
                  {errors.category && <p className="err-text">{errors.category}</p>}
                </div>

                <div className="row g-3">
                  {/* Payment Method */}
                  <div className="col-md-6">
                    <div className="form-group-bb">
                      <label>Payment Method</label>
                      <select className="bb-form-input" value={form.method}
                        onChange={(e) => setForm({...form, method:e.target.value})}>
                        {paymentMethods.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  {/* Date */}
                  <div className="col-md-6">
                    <div className="form-group-bb">
                      <label>Date <span className="req">*</span></label>
                      <input type="date" className={`bb-form-input ${errors.date?'input-err':''}`}
                        value={form.date} max={today}
                        onChange={(e) => setForm({...form, date:e.target.value})} />
                      {errors.date && <p className="err-text">{errors.date}</p>}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="form-group-bb">
                  <label>Notes <span className="optional">(optional)</span></label>
                  <textarea className="bb-form-input" rows={3}
                    placeholder="Any additional details..."
                    value={form.notes}
                    onChange={(e) => setForm({...form, notes:e.target.value})} />
                </div>

                <button type="submit" className="submit-btn">
                  <FaPlusCircle /> Add Expense
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddExpensePage;
