import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Register.css'; 

function Register() {
    const [fullName, setFullName] = React.useState('');
    const [idNumber, setIdNumber] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", {
                fullName,
                idNumber,
                accountNumber,
                email,
                password,
                confirmPassword, 
            });

            if (response.status === 201) {
                navigate('/login'); // Redirect to login page after successful registration
            }
        } catch (err) {
            const errorMessage = err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Something went wrong. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <div className="image-side">
                <img src="/paysherelogo.jpg" alt="Approved" />
            </div>
            <div className="form-side">
                <div className="navbar">
                    <button onClick={() => navigate('/')} aria-label="Go to Home">Home</button>
                    <button onClick={() => navigate('/about')} aria-label="Learn more about us">About Us</button>
                    <button onClick={() => navigate('/contact')} aria-label="Contact us">Contact</button>
                    <button onClick={() => navigate('/register')} aria-label="Go to Register">Register</button>
                    <button onClick={() => navigate('/login')} aria-label="Go to Login">Login</button>
                    <button onClick={() => navigate('/protected')} aria-label="Go to Protected">Protected</button>
                </div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="ID Number" 
                            value={idNumber} 
                            onChange={(e) => setIdNumber(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Account Number" 
                            value={accountNumber} 
                            onChange={(e) => setAccountNumber(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="register-btn" aria-label="Submit registration form">Register</button>
                </form>
                <p
                    className="login-link"
                    onClick={() => navigate('/login')}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}  // Makes the element focusable
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            navigate('/login');
                        }
                    }}
                >
                    Already have an account? Login here
                </p>
            </div>
        </div>
    );
}

export default Register;



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
