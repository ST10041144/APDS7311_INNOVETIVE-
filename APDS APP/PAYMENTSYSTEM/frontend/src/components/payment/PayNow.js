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

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const accountNumberPattern = /^[0-9]{10,18}$/;

        if (!accountNumberPattern.test(accountNumber)) {
            setError('Account number must be between 10 and 18 digits');
            return;
        }

        try {
            
            await axios.post("/api/payment/payment", {
                amount,
                currency,
                provider, 
                accountNumber,
                swiftCode,
                userEmail, 
            });

            onPaymentSuccess(amount, accountNumber, currency); 
            setSuccess('Payment has been made successfully!');

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="paynow-container">
            <h2>Make a Payment</h2>
            <form onSubmit={handlePayment}>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        {currencies.map((currencyOption) => (
                            <option key={currencyOption} value={currencyOption}>
                                {currencyOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Account Number</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>SWIFT Code</label>
                    <input
                        type="text"
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="paynow-btn">Pay Now</button>
            </form>
        </div>
    );
};

export default PayNow;
