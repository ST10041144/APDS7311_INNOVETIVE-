import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import { check, validationResult } from 'express-validator';
import { paymentRateLimiter, speedLimiter } from '../middleware/rateLimitMiddleware.js';
import { ensureSSL } from '../middleware/sslMiddleware.js';
import Employee from '../models/Employee.js'; 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Ensure SSL for all routes in this file
router.use(ensureSSL);

// Base route
router.get('/', (req, res) => {
    res.send('Welcome to the secure Customer Payment Portal');
});

// Registration Route with whitelisting
router.post(
    '/register',
    paymentRateLimiter, // Apply rate limiting to registration route
    speedLimiter,       // Apply speed limiting to registration route
    [
        // Whitelist and validate inputs
        // Code Attribution
        // This code was referenced from StackOverFlow 
        // filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow
        // Author name StackOverFlow 
        // filter - blacklisting vs whitelisting in form's input filtering and validation - Stack Overflow
        check('fullName')
            .trim()
            .matches(/^[a-zA-Z\s]+$/).withMessage('Full name must contain only letters and spaces')
            .isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
        check('idNumber')
            .trim()
            .isNumeric().withMessage('ID number must contain only numbers')
            .isLength({ min: 12 }).withMessage('ID number must be at least 12 digits'),
        check('accountNumber')
            .trim()
            .isLength({ min: 10 }).withMessage('Account number must be at least 10 characters'),
        check('email')
            .trim()
            .isEmail().withMessage('Invalid email format'),
        check('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/^[a-zA-Z0-9!@#$%^&()_+={}\[\]:;'"<>,.?/-]+$/)
            .withMessage('Password contains invalid characters'),
        check('confirmPassword')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Passwords do not match'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { fullName, idNumber, accountNumber, email, password, confirmPassword } = req.body;

            // Check if the email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            // Hash the password for security
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the additional fields
            // Code Attribution 
            // This code was referenced from Medium 
            // How to hash password in React App, before sending it to the API | by JonathanSanchez.Dev | Boca Code | Medium
            // Author name JonathanSanchez
            // https://medium.com/@jonathans199?source=post_page-----6e10a06f0a8e--------------------------------
            const newUser = new User({
                fullName,
                idNumber,
                accountNumber,
                email,
                password: hashedPassword,
                confirmPassword : hashedPassword
            });

            // Save the user to the database
            await newUser.save();

            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
        }
    }
);



// Login Route with whitelisting
router.post(
    '/login',
    paymentRateLimiter, // Apply rate limiting to login route
    speedLimiter,       // Apply speed limiting to login route
    async (req, res) => {
        const { email, password } = req.body;
        
        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token (added for improved security)
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            // Proceed with successful login
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    }
);

// Employee and Admin  Login Route
router.post(
    '/aeLogin',
    paymentRateLimiter,
    speedLimiter,
    async (req, res) => {
        const { email, password, role } = req.body;

        try {
            // Validate email and password input
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Find user (Employee or Admin) based on email and role
            const user = await Employee.findOne({ email, role });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token with user ID and role
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Successful login response
            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('login error:', error);
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    }
);



export default router;


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
