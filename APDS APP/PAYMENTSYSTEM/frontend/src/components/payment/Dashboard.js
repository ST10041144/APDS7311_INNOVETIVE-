import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Dashboard.css';
import PayNow from './PayNow';

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [recentTransactions, setRecentTransactions] = useState([]);

    // Retrieve the user's email from local storage or any state management
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error('User email not found in local storage');
        }
        setUserEmail(email);

        if (email) {
            axios.get(`/api/payment/payments/${email}`)
                .then((response) => {
                    console.log('Fetched transactions:', response.data);
                    setRecentTransactions(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching transactions:', error);
                });
        }
    }, [userEmail]);

    // Logout handler with keyboard accessibility
    const handleLogout = () => {
        //localStorage.removeItem('token');
        //localStorage.removeItem('userEmail');
        window.location.href = '/login';
    };

    const handleLogoutKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleLogout();
        }
    };

    const addTransaction = (amount, accountNumber, currency) => {
        const newTransaction = {
            recipient: userEmail,
            amount: `${amount} ${currency}`,
            accountNumber,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };

        setRecentTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    };

    return (
        <div className="dashboard">
            <div className="top-nav">
                <img src="/paysherelogo.jpg" alt="PayShere Logo" className="logo" />
                <div className="profile">
                    <img src="/user_icon.jpg" alt="Profile" className="profile-icon" />
                    <span className="username">{userEmail || 'Guest'}</span>
                    <div
                        className="logout-menu"
                        onClick={handleLogout}
                        onKeyDown={handleLogoutKeyDown}
                        role="button"
                        tabIndex={0}
                        aria-label="Logout"
                    >
                        Logout
                    </div>
                </div>
            </div>

            <h1 className="welcome-text">Your Digital Gateway To Global Finance</h1>

            <div className="action-cards">
                <PayNow onPaymentSuccess={addTransaction} userEmail={userEmail} />
            </div>

            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTransactions.map((transaction) => (
                            <tr key={transaction.createdAt || transaction.accountNumber}>
                                <td>{transaction.accountNumber}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : ''}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

// Code Attribution 
// This code was referenced from reactjs
// https://legacy.reactjs.org/docs/hooks-effect.html
// Author name reactjs
// Using the Effect Hook (reactjs.org)