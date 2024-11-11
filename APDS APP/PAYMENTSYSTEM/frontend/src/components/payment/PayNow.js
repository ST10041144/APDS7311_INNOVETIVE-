import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../PayNow.css';

const PayNow = ({ onPaymentSuccess, userEmail }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [accountNumber, setAccountNumber] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [provider] = useState('SWIFT');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const currencies = ['USD', 'EUR', 'GBP', 'ZAR'];

    // Improved regex using \d for digits
    const accountNumberPattern = /^\d{10,18}$/;

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate account number
        if (!accountNumberPattern.test(accountNumber)) {
            setError('Account number must be between 10 and 18 digits.');
            return;
        }

        try {
            // Save transaction to backend for pending review
            const response = await axios.post('/api/payment/payment', {
                amount,
                currency,
                provider,
                accountNumber,
                swiftCode,
                userEmail,
            });

            if (response.status === 201) {
                onPaymentSuccess(amount, accountNumber, currency);
                setSuccess('Payment has been made successfully!');

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred. Please try again later.';
            setError(errorMessage);
        }
    };

    return (
        <div className="paynow-container">
            <h2>Make a Payment</h2>
            <form onSubmit={handlePayment}>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

                {/* Amount Input */}
                <div className="pay-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                {/* Currency Selector */}
                <div className="pay-group">
                    <label htmlFor="currency">Currency</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        {currencies.map((currencyOption) => (
                            <option key={currencyOption} value={currencyOption}>
                                {currencyOption}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Account Number Input */}
                <div className="pay-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                        id="accountNumber"
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>

                {/* SWIFT Code Input */}
                <div className="pay-group">
                    <label htmlFor="swiftCode">SWIFT Code</label>
                    <input
                        id="swiftCode"
                        type="text"
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="paynow-btn"
                    onKeyDown={(e) => e.key === 'Enter' && handlePayment(e)}
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PayNow;

// Code Attribution 
// This code was referenced from reactjs
// https://legacy.reactjs.org/docs/hooks-effect.html
// Author name reactjs
// Using the Effect Hook (reactjs.org)

// Code Attribution 
// This code was referenced from mdn web docs 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// Author name mdm web docs 
// async function (mozilla.org)