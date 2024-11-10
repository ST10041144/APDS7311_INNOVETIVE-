import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../LoginEmp.css';

function LoginEmp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("/api/auth/loginEmp", {
                email,
                password,
            });

            // Store token and navigate to employee dashboard
            localStorage.setItem('token', response.data.token);
            navigate('/employeeDash');
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
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
                    {error && <p className="emp-error-message">{error}</p>}
                    <button className="emp-login-btn" type="submit">Login</button>
                </form>
                <p className="emp-register-link" onClick={() => navigate('/register')} tabIndex="0">
                    Customer? Register here
                </p>
            </div>
        </div>
    );
}

export default LoginEmp;
