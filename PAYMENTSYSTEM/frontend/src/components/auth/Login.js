import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Login.css'; // Assuming you have a CSS file for styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
<<<<<<< HEAD
            const response = await axios.post("https://localhost:5000/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/protected'); // Navigate to protected page upon successful login
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);  // Show server-provided error message
=======
            const response = await axios.post("https://localhost:5000/api/auth/login", { // Use HTTP if HTTPS is not configured
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/protected'); // Navigate to protected page upon successful login
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="image-side">
                <img src="/paysherelogo.jpg" alt="Approved" />
            </div>
            <div className="form-side">
<<<<<<< HEAD
=======
                {/* Updated Navbar with click functionality */}
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
                <div className="navbar">
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate('/about')}>About Us</button>
                    <button onClick={() => navigate('/contact')}>Contact</button>
                    <button onClick={() => navigate('/register')}>Register</button>
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
<<<<<<< HEAD
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <button className="login-btn" type="submit">Login</button>
                </form>
=======
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-btn" type="submit">Login</button>
                </form>
                {/* Functionality for Register link */}
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
                <p className="register-link" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
                    Don't have an account? Register here
                </p>
            </div>
        </div>
    );
}

export default Login;
