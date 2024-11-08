import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/auth/Login';
import ProtectPage from './components/ProtectedPage';
import Register from './components/auth/Register';
import Navbar from './components/navbar';
import Dashboard from './components/payment/Dashboard';
import PayNow from './components/payment/PayNow';
import EmployeeDashboard from './EmployeeDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
        <Route path="/" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/payNow" element={<PayNow />}/>
      <Route path="/employeeDash" element={<EmployeeDashboard />}/>
      <Route path="/protected" element={<ProtectPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// Code Attribution 
// This code was referenced from Medium 
// How to hash password in React App, before sending it to the API | by JonathanSanchez.Dev | Boca Code | Medium
// Author name JonathanSanchez
// https://medium.com/@jonathans199?source=post_page-----6e10a06f0a8e--------------------------------


// Code Attribution
// This code was referenced from StackOverFlow 
// filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow
// Author name StackOverFlow 
// filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow



// Code Attribution
// This code was referened from Dev Community
// Data Encryption: Securing Data at Rest and in Transit with Encryption Technologies - DEV Community 
// Author name Jatin 
//https://dev.to/j471n

// Code Attribution 
// This code was referenced from Practical devsecops
// What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com) 
// Author name Devscopes 
//What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com)