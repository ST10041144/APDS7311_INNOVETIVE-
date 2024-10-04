import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import { validatePaymentInput } from '../middleware/paymentValidationMiddleware.js';
import { check, validationResult } from 'express-validator';
import { paymentRateLimiter } from '../middleware/rateLimitMiddleware.js';
import { ensureSSL } from '../middleware/sslMiddleware.js';

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
    [
        // Whitelist and validate inputs
        check('firstName')
            .trim()
            .isAlpha().withMessage('First name must contain only letters')
            .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
        check('lastName')
            .trim()
            .isAlpha().withMessage('Last name must contain only letters')
            .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
        check('phoneNumber')
            .trim()
            .isMobilePhone().withMessage('Invalid phone number'),
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
            const { firstName, lastName, phoneNumber, email, password, confirmPassword } = req.body;

            // Check if the email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            // Hash the password for security
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the additional fields
            const newUser = new User({
                firstName,
                lastName,
                phoneNumber,
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
router.post('/login', async (req, res) => {
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

        // Proceed with successful login (e.g., generate token)
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
});

export default router;