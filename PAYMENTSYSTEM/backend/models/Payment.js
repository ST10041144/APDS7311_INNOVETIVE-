// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
