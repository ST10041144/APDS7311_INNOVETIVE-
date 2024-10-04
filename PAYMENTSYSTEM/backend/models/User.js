import mongoose from 'mongoose';

<<<<<<< HEAD

=======
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
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
<<<<<<< HEAD
        lowercase: true,  // Normalize email to lowercase
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email address'],
=======
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email address']
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
    },
    password: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
=======

    confirmPassword: {
        type: String,
        required: true,
    },
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

<<<<<<< HEAD
export default mongoose.model('User', userSchema);
=======
export default mongoose.model('User', userSchema);
>>>>>>> 25c281919ede309ab0f132a750c44d0495c24940
