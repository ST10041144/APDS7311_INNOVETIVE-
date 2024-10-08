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
    body('userEmail').isString().withMessage('User email is required'), // Adding userEmail validation
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
        userEmail, // Store user's email
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

export default router;
