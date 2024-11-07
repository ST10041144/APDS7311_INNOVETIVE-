import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingTransactions.css';

const PendingTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    // Fetch transactions from the backend
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions/pending');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching pending transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleViewClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsVerified(false);
    };

    const handleVerifyClick = () => {
        setIsVerified(true);
    };

    const handleSubmitToSwiftClick = async (transactionId) => {
        alert("Transaction submitted to SWIFT.");

        // Remove transaction from list after submission
        setTransactions(prevTransactions =>
            prevTransactions.filter(transaction => transaction.id !== transactionId)
        );

        setSelectedTransaction(null);
    };

    const handleClosePopup = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="main-content">
            <h1>Pending Transactions</h1>
            <div className="transaction-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name & Surname (Payee)</th>
                            <th>Amount Paid</th>
                            <th>Account Number</th>
                            <th>SWIFT Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.payeeName}</td>
                                <td>{transaction.amountPaid}</td>
                                <td>{transaction.accountNumber}</td>
                                <td>{transaction.swiftCode}</td>
                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() => handleViewClick(transaction)}
                                    >
                                        View Transaction
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedTransaction && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Transaction Details</h2>
                        <p><strong>Payee Name:</strong> {selectedTransaction.payeeName}</p>
                        <p><strong>Amount Paid:</strong> {selectedTransaction.amountPaid}</p>
                        <p><strong>Account Number:</strong> {selectedTransaction.accountNumber}</p>
                        <p><strong>SWIFT Code:</strong> {selectedTransaction.swiftCode}</p>

                        {!isVerified ? (
                            <button className="verify-btn" onClick={handleVerifyClick}>
                                Verify
                            </button>
                        ) : (
                            <button
                                className="submit-btn"
                                onClick={() => handleSubmitToSwiftClick(selectedTransaction.id)}
                            >
                                Submit to SWIFT
                            </button>
                        )}
                        <button className="close-btn" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingTransactions;
