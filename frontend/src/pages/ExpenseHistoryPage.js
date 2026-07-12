import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaFilter, FaCheckCircle } from 'react-icons/fa';
import { FaUtensils, FaBus, FaBook, FaShoppingBag, FaFilm, FaPhone, FaHospital, FaBoxOpen } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const categoryIcons = { Food:<FaUtensils/>, Travel:<FaBus/>, Books:<FaBook/>, Shopping:<FaShoppingBag/>, Entertainment:<FaFilm/>, Recharge:<FaPhone/>, Medical:<FaHospital/>, Others:<FaBoxOpen/> };
const categoryColors = { Food:'#F44336', Travel:'#2196F3', Books:'#00C853', Shopping:'#E91E63', Entertainment:'#7C4DFF', Recharge:'#FF9800', Medical:'#00BCD4', Others:'#9E9E9E' };

const initialExpenses = [
  {id:1, name:'Lunch at Canteen',  category:'Food',          amount:120,  date:'2026-07-12', method:'Cash',   notes:''},
  {id:2, name:'Bus Pass',          category:'Travel',        amount:200,  date:'2026-07-11', method:'UPI',    notes:'Monthly pass'},
  {id:3, name:'Python Book',       category:'Books',         amount:350,  date:'2026-07-10', method:'UPI',    notes:''},
  {id:4, name:'Netflix',           category:'Entertainment', amount:199,  date:'2026-07-09', method:'Card',   notes:'Monthly sub'},
  {id:5, name:'Mobile Recharge',   category:'Recharge',      amount:299,  date:'2026-07-08', method:'UPI',    notes:''},
  {id:6, name:'Grocery Shopping',  category:'Shopping',      amount:650,  date:'2026-07-07', method:'Cash',   notes:''},
  {id:7, name:'Doctor Visit',      category:'Medical',       amount:500,  date:'2026-07-06', method:'Card',   notes:'Clinic fee'},
  {id:8, name:'Coffee',            category:'Food',          amount:80,   date:'2026-07-05', method:'UPI',    notes:''},
];

const ExpenseHistoryPage = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const filtered = expenses.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || e.category === filterCat;
    return matchSearch && matchCat;
  });

  const handleEdit = (exp) => { setEditId(exp.id); setEditForm({...exp}); };
  const handleSaveEdit = () => {
    setExpenses(expenses.map(e => e.id===editId ? {...editForm} : e));
    setEditId(null);
    showToast('Expense updated successfully!');
  };
  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    setDeleteId(null);
    showToast('Expense deleted.');
  };

  const total = filtered.reduce((s,e) => s+e.amount, 0);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Expense History</h2>
          <p className="page-sub">View, search, edit and delete all your recorded expenses</p>
        </div>

        {toast && <div className="success-toast"><FaCheckCircle /> {toast}</div>}

        {/* Search & Filter */}
        <div className="inner-card mb-4">
          <div className="search-filter-row">
            <div className="search-wrap">
              <FaSearch className="search-icon" />
              <input type="text" className="search-input" placeholder="Search expenses..."
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-wrap">
              <FaFilter className="filter-icon" />
              <select className="filter-select" value={filterCat} onChange={(e)=>setFilterCat(e.target.value)}>
                <option>All</option>
                {Object.keys(categoryIcons).map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-summary">
            <span>{filtered.length} expenses found</span>
            <span className="filter-total">Total: <strong>₹{total.toLocaleString('en-IN')}</strong></span>
          </div>
        </div>

        {/* Expense Table */}
        <div className="inner-card">
          <div className="expense-table-wrap">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>#</th><th>Expense</th><th>Category</th><th>Amount</th><th>Date</th><th>Method</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="no-data">No expenses found</td></tr>
                ) : filtered.map((exp, i) => (
                  editId === exp.id ? (
                    <tr key={exp.id} className="edit-row">
                      <td>{i+1}</td>
                      <td><input className="table-input" value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})} /></td>
                      <td>
                        <select className="table-input" value={editForm.category} onChange={e=>setEditForm({...editForm,category:e.target.value})}>
                          {Object.keys(categoryIcons).map(c=><option key={c}>{c}</option>)}
                        </select>
                      </td>
                      <td><input type="number" className="table-input" value={editForm.amount} onChange={e=>setEditForm({...editForm,amount:Number(e.target.value)})} /></td>
                      <td><input type="date" className="table-input" value={editForm.date} onChange={e=>setEditForm({...editForm,date:e.target.value})} /></td>
                      <td>{editForm.method}</td>
                      <td>
                        <button className="action-btn save" onClick={handleSaveEdit}>Save</button>
                        <button className="action-btn cancel" onClick={()=>setEditId(null)}>Cancel</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={exp.id}>
                      <td>{i+1}</td>
                      <td className="exp-name-cell">
                        <div className="exp-cat-dot" style={{background:categoryColors[exp.category]}} />
                        {exp.name}
                      </td>
                      <td>
                        <span className="cat-badge" style={{background:`${categoryColors[exp.category]}18`, color:categoryColors[exp.category]}}>
                          {categoryIcons[exp.category]} {exp.category}
                        </span>
                      </td>
                      <td className="amount-cell">₹{exp.amount}</td>
                      <td>{exp.date}</td>
                      <td>{exp.method}</td>
                      <td>
                        <button className="action-btn edit" onClick={()=>handleEdit(exp)}><FaEdit /></button>
                        <button className="action-btn delete" onClick={()=>setDeleteId(exp.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h5>Delete Expense?</h5>
              <p>This action cannot be undone.</p>
              <div className="modal-btns">
                <button className="action-btn delete" onClick={()=>handleDelete(deleteId)}>Yes, Delete</button>
                <button className="action-btn cancel" onClick={()=>setDeleteId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpenseHistoryPage;
