import express from 'express';
import { body, validationResult } from 'express-validator';
import validatePayment from '../middleware/paymentValidationMiddleware.js'; 
import Payment from '../models/Payment.js';

const router = express.Router();

// Initiate a payment
router.post(
  '/payment',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isString().withMessage('Currency is required'),
    body('provider').isString().withMessage('Provider is required'),
    body('accountNumber').isString().withMessage('Account number is required'),
    body('swiftCode').isString().withMessage('SWIFT code is required'),
    body('userEmail').isString().withMessage('User email is required'), 
  ],
  validatePayment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency, provider, accountNumber, swiftCode, userEmail } = req.body;

    try {
      // Create a new payment object
      const payment = new Payment({
        amount,
        currency,
        provider,
        accountNumber,
        swiftCode,
        status: 'Pending',
        userEmail, 
      });

      await payment.save();

      res.status(201).json({ message: 'Payment initiated successfully', payment });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// Fetch payments for a user
router.get('/payments/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
    const payments = await Payment.find({ userEmail }); // Find payments by userEmail
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
});

// Fetch all payments for the employee dashboard
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find(); // Fetch all payments
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
});

// Update payment status
router.put('/payments/:id/verify', async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = 'Processed'; // Update status to Processed
    await payment.save();

    res.status(200).json({ message: 'Payment verified successfully', payment });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying payment', error: err.message });
  }
});

export default router;




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