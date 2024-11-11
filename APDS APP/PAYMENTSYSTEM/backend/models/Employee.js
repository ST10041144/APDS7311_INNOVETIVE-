import mongoose from 'mongoose';

// Define the Employee schema
const employeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true, 
    },
    password: {
      type: String,
      required: true, 
    },
    role: {
      type: String,
      enum: ['Admin', 'Employee', 'Customer'], 
      default: 'Employee', 
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
