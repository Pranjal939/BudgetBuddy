import React from 'react';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import {
  FaWallet, FaArrowDown, FaPiggyBank, FaChartPie,
  FaPlusCircle, FaMoneyBillWave, FaBell,
  FaExclamationTriangle, FaUtensils, FaBus, FaBook,
  FaShoppingBag, FaFilm, FaPhone, FaHospital, FaBoxOpen,
  FaCreditCard
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './DashboardPage.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const categoryIcons = {
  Food: <FaUtensils />, Travel: <FaBus />, Books: <FaBook />,
  Shopping: <FaShoppingBag />, Entertainment: <FaFilm />,
  Recharge: <FaPhone />, Medical: <FaHospital />, Others: <FaBoxOpen />
};

const categoryColors = {
  Food:'#F44336', Travel:'#2196F3', Books:'#00C853',
  Shopping:'#E91E63', Entertainment:'#7C4DFF',
  Recharge:'#FF9800', Medical:'#00BCD4', Others:'#9E9E9E'
};

// Sample data
const recentTransactions = [
  { id:1, name:'Lunch at Canteen',  category:'Food',          amount:120,  date:'2026-07-12', method:'Cash' },
  { id:2, name:'Bus Pass',          category:'Travel',        amount:200,  date:'2026-07-11', method:'UPI' },
  { id:3, name:'Python Book',       category:'Books',         amount:350,  date:'2026-07-10', method:'UPI' },
  { id:4, name:'Netflix',           category:'Entertainment', amount:199,  date:'2026-07-09', method:'Card' },
  { id:5, name:'Mobile Recharge',   category:'Recharge',      amount:299,  date:'2026-07-08', method:'UPI' },
];

const budget = 8000;
const totalExpense = 4200;
const savings = budget - totalExpense;
const savingsGoal = 2000;

const categoryData = { Food:1200, Travel:800, Books:600, Shopping:1600 };

const DashboardPage = () => {
  const pct = Math.round((totalExpense / budget) * 100);
  const isOver = totalExpense > budget;

  const donutData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: Object.keys(categoryData).map(k => categoryColors[k]),
      borderWidth: 2, borderColor: '#fff',
    }]
  };

  const barData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    datasets: [{
      label: 'Monthly Expenses (₹)',
      data: [3200, 4100, 3800, 5200, 4600, 3900, 4200],
      backgroundColor: 'rgba(0,200,83,0.7)',
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: '#e5e7eb' }, ticks: { color: '#6b7280' } },
      x: { grid: { display: false }, ticks: { color: '#6b7280' } }
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {/* Header */}
        <div className="db-header">
          <div>
            <h2 className="db-title">Dashboard</h2>
            <p className="db-subtitle">Welcome back, <strong>Priya</strong> 👋 — July 2026</p>
          </div>
          <Link to="/add-expense" className="db-add-btn">
            <FaPlusCircle /> Add Expense
          </Link>
        </div>

        {/* Smart Reminder */}
        <div className={`smart-reminder ${isOver ? 'reminder-danger' : 'reminder-info'}`}>
          {isOver ? <FaExclamationTriangle /> : <FaBell />}
          <span>
            {isOver
              ? `⚠️ You have exceeded your monthly budget by ₹${totalExpense - budget}! Please control your spending.`
              : `You haven't recorded any expenses today. Don't forget to log them!`
            }
          </span>
        </div>

        {/* Summary Cards */}
        <div className="db-cards">
          <div className="db-card card-budget">
            <div className="db-card-icon"><FaWallet /></div>
            <div>
              <p className="db-card-label">Monthly Budget</p>
              <h3 className="db-card-value">₹{budget.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="db-card card-expense">
            <div className="db-card-icon"><FaArrowDown /></div>
            <div>
              <p className="db-card-label">Total Expenses</p>
              <h3 className="db-card-value">₹{totalExpense.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="db-card card-remaining">
            <div className="db-card-icon"><FaChartPie /></div>
            <div>
              <p className="db-card-label">Remaining Budget</p>
              <h3 className="db-card-value">₹{savings.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="db-card card-savings">
            <div className="db-card-icon"><FaPiggyBank /></div>
            <div>
              <p className="db-card-label">Savings</p>
              <h3 className="db-card-value">₹{savingsGoal.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="db-card card-accounts">
            <div className="db-card-icon"><FaCreditCard /></div>
            <div>
              <p className="db-card-label">Total Balance</p>
              <h3 className="db-card-value">₹18,250</h3>
              <p className="db-card-sub">Across 4 accounts</p>
            </div>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="db-progress-card">
          <div className="db-progress-header">
            <span>Budget Used</span>
            <span className={pct > 80 ? 'pct-danger' : 'pct-ok'}>{pct}%</span>
          </div>
          <div className="db-progress-bar">
            <div className="db-progress-fill"
              style={{ width: `${Math.min(pct,100)}%`, background: pct > 80 ? '#ef4444' : '#00C853' }} />
          </div>
          <div className="db-progress-labels">
            <span>₹{totalExpense.toLocaleString('en-IN')} spent</span>
            <span>₹{Math.max(0, budget - totalExpense).toLocaleString('en-IN')} remaining</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="db-quick-actions">
          <h5>Quick Actions</h5>
          <div className="qa-grid">
            <Link to="/add-expense" className="qa-btn">
              <FaPlusCircle /> Add Expense
            </Link>
            <Link to="/budget" className="qa-btn">
              <FaMoneyBillWave /> Set Budget
            </Link>
            <Link to="/reports" className="qa-btn">
              <FaChartPie /> View Reports
            </Link>
            <Link to="/goals" className="qa-btn">
              <FaPiggyBank /> Savings Goals
            </Link>
          </div>
        </div>

        {/* Charts */}
        <div className="db-charts">
          <div className="chart-card">
            <h5>Monthly Expenses (₹)</h5>
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="chart-card">
            <h5>Category-wise Spending</h5>
            <div className="donut-wrap">
              <Doughnut data={donutData} options={{ plugins: { legend: { position: 'bottom' } }, cutout:'65%' }} />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="db-recent">
          <div className="db-recent-header">
            <h5>Recent Transactions</h5>
            <Link to="/expenses">View All →</Link>
          </div>
          <div className="recent-list">
            {recentTransactions.map(tx => (
              <div className="recent-item" key={tx.id}>
                <div className="recent-icon" style={{ background: `${categoryColors[tx.category]}18`, color: categoryColors[tx.category] }}>
                  {categoryIcons[tx.category]}
                </div>
                <div className="recent-info">
                  <p className="recent-name">{tx.name}</p>
                  <span className="recent-meta">{tx.category} • {tx.date} • {tx.method}</span>
                </div>
                <span className="recent-amount">-₹{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;
