import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/payment/payments')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  const handleVerifyPayment = (payment) => {
    setSelectedPayment(payment);
  };

  const handleConfirmVerifyPayment = async () => {
    try {
      await axios.put(`/api/payment/payments/${selectedPayment._id}/verify`);
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === selectedPayment._id ? { ...payment, status: 'Processed' } : payment
        )
      );
      setSelectedPayment({ ...selectedPayment, status: 'Processed' });
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handleSubmitToSwift = async () => {
    setMessage('Transaction submitted to SWIFT.');
    setSelectedPayment(null);
  };

  return (
    <div className="employee-dashboard">
      <h2>Employee Dashboard - Verify Payments</h2>
      {message && <div className="message">{message}</div>}
      <table className="payments-table">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.accountNumber}</td>
              <td>{payment.amount}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              <td>{payment.status}</td>
              <td>
                {payment.status === 'Pending' && (
                  <button className="action-btn" onClick={() => handleVerifyPayment(payment)}>
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPayment && (
        <div className="popup">
          <div className="popup-content">
            <h3>Transaction Details</h3>
            <p><strong>Account Number:</strong> {selectedPayment.accountNumber}</p>
            <p><strong>Amount:</strong> {selectedPayment.amount}</p>
            <p><strong>Date:</strong> {new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            {selectedPayment.status === 'Pending' && (
              <button className="confirm-btn" onClick={handleConfirmVerifyPayment}>
                Verify
              </button>
            )}
            {selectedPayment.status === 'Processed' && (
              <button className="submit-btn" onClick={handleSubmitToSwift}>
                Submit to SWIFT
              </button>
            )}
            <button className="close-btn" onClick={() => setSelectedPayment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;