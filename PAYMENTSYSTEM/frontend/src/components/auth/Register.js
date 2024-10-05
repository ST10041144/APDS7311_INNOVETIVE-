import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Register.css'; // Assuming you have a CSS file for styles

function Register() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
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
            const response = await axios.post("https://localhost:5000/api/auth/register", {
                firstName,
                lastName,
                phoneNumber,
                email,
                password,
                confirmPassword, // Optional; you can remove this line as it's not needed for the API
            });

            if (response.status === 201) {
                navigate('/login'); // Redirect to login page after successful registration
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors.map(e => e.msg).join(', '));  // Show validation errors
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="image-side">
                <img src="/paysherelogo.jpg" alt="Approved" />
            </div>
            <div className="form-side">
                <div className="navbar">
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate('/about')}>About Us</button>
                    <button onClick={() => navigate('/contact')}>Contact</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/protected')}>Protected</button>
                </div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Phone Number" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
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
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p className="login-link" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                    Already have an account? Login here
                </p>
            </div>
        </div>
    );
}

export default Register;
