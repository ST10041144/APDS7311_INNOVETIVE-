import express from 'express';
import { body, validationResult } from 'express-validator';
import validatePayment from '../middleware/paymentValidationMiddleware.js'; // Ensure this points to the correct middleware
import Payment from '../models/Payment.js';



const router = express.Router();

// Initiate a payment
router.post(
  '/initiate',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isString().withMessage('Currency is required'),
    body('recipient').isString().withMessage('Recipient is required')
  ],
  validatePayment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency, recipient } = req.body;

    try {
      // Create a new payment object
      const payment = new Payment({
        amount,
        currency,
        recipient,
        status: 'Pending'
      });

      await payment.save();

      res.status(201).json({ message: 'Payment initiated successfully', payment });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);

export default router;
