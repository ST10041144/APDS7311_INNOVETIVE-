import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch all payments on component mount
    axios.get('/api/payment/payments')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  const handleVerifyPayment = async (paymentId) => {
    try {
      await axios.put(`/api/payment/payments/${paymentId}/verify`);
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId ? { ...payment, status: 'Processed' } : payment
        )
      );
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };
  

  return (
    <div className="employee-dashboard">
      <h2>Employee Dashboard - Verify Payments</h2>
      <table>
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
                  <button onClick={() => handleVerifyPayment(payment._id)}>
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
