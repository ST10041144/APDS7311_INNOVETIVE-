import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/auth/Login';
import ProtectPage from './components/ProtectedPage';
import Register from './components/auth/Register';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <Router>
 <div className='App' >
  <Navbar />
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/protected" element={<ProtectPage />}/>
    </Routes>
    </div>
      </Router>
   
  );
}

export default App;
