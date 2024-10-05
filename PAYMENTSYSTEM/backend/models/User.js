import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits'],  // Adjust as per your desired format
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
    },

    confirmPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', userSchema);
