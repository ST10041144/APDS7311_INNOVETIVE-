import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
   

    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <h1>Welcome Back, Employee</h1>
                <div className="action-cards">
                    <Link to= "/pending" className="card">
                        <img src="transaction-icon.png" alt="View Transactions" />
                        <p>Pending Transactions</p>
                    </Link>
                    <Link to= "/payments" className="card">
                        <img src="payment-icon.png" alt="View Payments" />
                        <p>View Payments</p>
                    </Link>
                </div>
            </div>

          
        </div>
    );
};

export default EmployeeDashboard;
