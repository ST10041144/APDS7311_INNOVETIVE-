import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [accountnumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isEmployee, setIsEmployee] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                accountnumber: isEmployee ? '' : accountnumber,
                password,
            });

            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email);

            // Redirect based on the role received from the backend
            if (role === 'Employee') {
                navigate('/employeeDash');
            } else if (role === 'Admin' || role === 'SuperAdmin') {
                navigate('/adminDash');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            // chaining to access error messages
            const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(errorMessage);
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);

        // Check if the email belongs to an employee (e.g., if it contains a specific domain)
        setIsEmployee(email.includes('@yourcompany.com'));
    };

    // Function to handle keyboard events for accessibility
    const handleKeyDown = (e, navigateTo) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navigateTo();  // Navigate on Enter or Space
        }
    };

    return (
        <div className="login-container">
            <div className="image-side">
                <img src="/paysherelogo.jpg" alt="Approved" />
            </div>
            <div className="form-side">
                <div className="navbar">
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate('/about')}>About Us</button>
                    <button onClick={() => navigate('/contact')}>Contact</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/protected')}>Protected</button>
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    {!isEmployee && (
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Account Number"
                                value={accountnumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <p
                    className="register-link"
                    onClick={() => navigate('/register')}
                    style={{ cursor: 'pointer' }}
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, () => navigate('/register'))}  // Keyboard listener added
                >
                    New Customer? Register here
                </p>
                <p
                    className="Login-btnEmp"
                    onClick={() => navigate('/loginEmp')}
                    style={{ cursor: 'pointer' }}
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, () => navigate('/loginEmp'))}  // Keyboard listener added
                >
                    Employee? Login here
                </p>
            </div>
        </div>
    );
}

export default Login;

// Code Attribution 
// This code was referenced from mdn web docs 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// Author name mdm web docs 
// async function (mozilla.org)