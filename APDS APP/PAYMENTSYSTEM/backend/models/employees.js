import mongoose from 'mongoose';

// Define the Employee schema
const employeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      trim: true, // Trims leading/trailing whitespace
    },
    password: {
      type: String,
      required: true, // Ensures password is required
    },
    role: {
      type: String,
      enum: ['Admin', 'Employee', 'Customer'], // Defines allowed roles
      default: 'Employee', // Default role is Employee
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
