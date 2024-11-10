import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../LoginEmp.css';

function LoginEmp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`/api/auth/aeLogin`, {
                email,
                password,
                role,
            });

            // Store token and navigate to the appropriate dashboard
            localStorage.setItem('token', response.data.token);
            if (role === 'Admin') {
                navigate('/adminDash'); // Admin Dashboard
            } else {
                navigate('/employeeDash'); // Employee Dashboard
            }
        } catch (err) {
            // Using optional chaining for error handling
            const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="login-emp-container">
            <div className="image-side">
                <img src="/paysherelogo.jpg" alt="Employee Login" />
            </div>
            <div className="emp-form-side">
                <h2>Employee Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="emp-form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="emp-form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Add Role Selection Dropdown */}
                    <div className="emp-form-group">
                        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    {error && <p className="emp-error-message">{error}</p>}
                    <button className="emp-login-btn" type="submit">Login</button>
                </form>
                <p
                    className="emp-register-link"
                    onClick={() => navigate('/register')}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}  // Makes the element focusable
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            navigate('/register');
                        }
                    }}
                >
                    Customer? Register here
                </p>
            </div>
        </div>
    );
}

export default LoginEmp;
