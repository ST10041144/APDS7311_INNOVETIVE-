import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import LoginEmp from './components/auth/LoginEmp';
import ProtectPage from './components/ProtectedPage';
import Register from './components/auth/Register';
import Navbar from './components/navbar';
import Dashboard from './components/payment/Dashboard';
import PayNow from './components/payment/PayNow';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginEmp" element={<LoginEmp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payNow" element={<PayNow />} />
          <Route path="/employeeDash" element={<EmployeeDashboard />} />
          <Route path="/adminDash/*" element={<AdminDashboard />} /> 
          <Route path="/protected" element={<ProtectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
