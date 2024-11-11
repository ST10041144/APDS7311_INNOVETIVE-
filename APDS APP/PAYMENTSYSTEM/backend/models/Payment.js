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
  provider: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  swiftCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  userEmail: { 
    type: String,
    required: true,
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
