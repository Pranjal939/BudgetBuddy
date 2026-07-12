import React, { useState } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title } from 'chart.js';
import { FaChartPie, FaChartBar } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title);

const categoryData = { Food:1200, Travel:800, Books:600, Shopping:1600, Entertainment:199, Recharge:299, Medical:500, Others:0 };
const categoryColors = ['#F44336','#2196F3','#00C853','#E91E63','#7C4DFF','#FF9800','#00BCD4','#9E9E9E'];

const ReportsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('July 2026');

  const pieData = {
    labels: Object.keys(categoryData).filter(k => categoryData[k] > 0),
    datasets: [{
      data: Object.values(categoryData).filter(v => v > 0),
      backgroundColor: categoryColors,
      borderWidth: 2, borderColor: '#fff',
    }]
  };

  const barData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    datasets: [{
      label: 'Monthly Expenses (₹)',
      data: [3200,4100,3800,5200,4600,3900,4200],
      backgroundColor: 'rgba(0,200,83,0.75)',
      borderRadius: 8,
    }]
  };

  const lineData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    datasets: [
      {
        label: 'Budget (₹)',
        data: [8000,8000,8000,8000,8000,8000,8000],
        borderColor: '#00C853', backgroundColor: 'rgba(0,200,83,0.1)',
        fill: true, tension: 0.4,
      },
      {
        label: 'Expenses (₹)',
        data: [3200,4100,3800,5200,4600,3900,4200],
        borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)',
        fill: true, tension: 0.4,
      }
    ]
  };

  const savingsData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    datasets: [{
      label: 'Savings (₹)',
      data: [4800,3900,4200,2800,3400,4100,3800],
      backgroundColor: 'rgba(124,77,255,0.7)',
      borderRadius: 8,
    }]
  };

  const chartOpts = { responsive:true, plugins:{legend:{position:'bottom'}}, scales:{ y:{grid:{color:'#e5e7eb'}, ticks:{color:'#6b7280'}}, x:{grid:{display:false}, ticks:{color:'#6b7280'}} } };

  const total = Object.values(categoryData).reduce((a,b)=>a+b,0);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h2 className="page-title">Reports & Analytics</h2>
            <p className="page-sub">Detailed analysis of your spending and savings</p>
          </div>
          <select className="month-select" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}>
            {['January 2026','February 2026','March 2026','April 2026','May 2026','June 2026','July 2026'].map(m=><option key={m}>{m}</option>)}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="report-summary">
          {[
            {label:'Total Budget', value:'₹8,000', color:'#00C853'},
            {label:'Total Spent',  value:`₹${total.toLocaleString('en-IN')}`, color:'#ef4444'},
            {label:'Savings',      value:`₹${(8000-total).toLocaleString('en-IN')}`, color:'#7C4DFF'},
            {label:'Highest Category', value:'Shopping ₹1,600', color:'#E91E63'},
          ].map((s,i) => (
            <div className="report-stat" key={i} style={{borderLeft:`4px solid ${s.color}`}}>
              <p className="rs-label">{s.label}</p>
              <h4 className="rs-value" style={{color:s.color}}>{s.value}</h4>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="reports-grid">
          <div className="inner-card">
            <div className="chart-head"><FaChartPie style={{color:'#00C853'}} /><h5>Category-wise Spending</h5></div>
            <Doughnut data={pieData} options={{ plugins:{legend:{position:'bottom'}}, cutout:'60%' }} />
          </div>
          <div className="inner-card">
            <div className="chart-head"><FaChartBar style={{color:'#2196F3'}} /><h5>Monthly Expense Bar Chart</h5></div>
            <Bar data={barData} options={chartOpts} />
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="reports-grid">
          <div className="inner-card">
            <div className="chart-head"><span>📈</span><h5>Budget vs Expenses</h5></div>
            <Line data={lineData} options={chartOpts} />
          </div>
          <div className="inner-card">
            <div className="chart-head"><span>💰</span><h5>Monthly Savings Report</h5></div>
            <Bar data={savingsData} options={chartOpts} />
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="inner-card">
          <h5 style={{color:'#004D40', fontWeight:800, marginBottom:16}}>Category-wise Breakdown</h5>
          <div className="breakdown-list">
            {Object.entries(categoryData).filter(([,v])=>v>0).map(([cat,amt],i) => (
              <div className="breakdown-row" key={cat}>
                <div className="bd-cat" style={{color:categoryColors[i]}}>
                  <div className="bd-dot" style={{background:categoryColors[i]}} />
                  {cat}
                </div>
                <div className="bd-bar-wrap">
                  <div className="bd-bar-fill" style={{width:`${(amt/total*100).toFixed(0)}%`, background:categoryColors[i]}} />
                </div>
                <span className="bd-pct">{(amt/total*100).toFixed(1)}%</span>
                <span className="bd-amt">₹{amt}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
