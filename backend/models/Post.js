import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        match: [/^[A-Z]{3}$/, 'Currency code must be a 3-letter ISO code.'],
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    // Additional fields like transaction status, method, etc.
});

export default mongoose.model('Transaction', transactionSchema);
