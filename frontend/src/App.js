import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import BudgetPage from './pages/BudgetPage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseHistoryPage from './pages/ExpenseHistoryPage';
import ReportsPage from './pages/ReportsPage';
import GoalsPage from './pages/GoalsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ContactHelpPage from './pages/ContactHelpPage';
import AccountsPage from './pages/AccountsPage';

function App() {
  return (
    <Routes>
      {/* Before Login */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* After Login */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/add-expense" element={<AddExpensePage />} />
      <Route path="/expenses" element={<ExpenseHistoryPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/contact" element={<ContactHelpPage />} />
    </Routes>
  );
}

export default App;
