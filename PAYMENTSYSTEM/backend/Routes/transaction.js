import express from 'express';
import Transaction from '../models/Transaction.js';

import { body, validationResult } from 'express-validator';


const router = express.Router();

// Get all transactions
router.get('/history', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get a specific transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
