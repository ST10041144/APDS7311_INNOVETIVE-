import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Login.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [accountnumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isEmployee, setIsEmployee] = useState(false); // New state to track if the user is an employee
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                accountnumber: isEmployee ? '' : accountnumber, // Don't send account number for employees
                password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', email);
            navigate('/dashboard'); // Navigate to dashboard page
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message); // Show server-provided error message
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);

        // Check if the email belongs to an employee (e.g., if it contains a specific domain)
        if (email.includes('@yourcompany.com')) { 
            setIsEmployee(true); // Mark as employee if the email is from the specific domain
        } else {
            setIsEmployee(false); // Otherwise, it's a customer
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
                <p className="register-link" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
                    Don't have an account? Register here
                </p>
            </div>
        </div>
    );
}


export default Login;


// Code Attribution 
// This code was referenced from Medium 
// How to hash password in React App, before sending it to the API | by JonathanSanchez.Dev | Boca Code | Medium
// Author name JonathanSanchez
// https://medium.com/@jonathans199?source=post_page-----6e10a06f0a8e--------------------------------


// Code Attribution
// This code was referenced from StackOverFlow 
// filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow
// Author name StackOverFlow 
// filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow



// Code Attribution
// This code was referened from Dev Community
// Data Encryption: Securing Data at Rest and in Transit with Encryption Technologies - DEV Community 
// Author name Jatin 
//https://dev.to/j471n

// Code Attribution 
// This code was referenced from Practical devsecops
// What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com) 
// Author name Devscopes 
//What is DevSecOps Pipelines? - Easy Guide to Understand (practical-devsecops.com)