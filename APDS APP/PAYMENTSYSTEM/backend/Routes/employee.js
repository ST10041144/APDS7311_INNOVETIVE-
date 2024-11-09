import express from 'express';
import Employee from '../models/Employee.js';


const router = express.Router();

// Fetch all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees
        res.status(200).json(employees); // Return as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Add a new employee
router.post('/', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Check if the email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new employee
        const newEmployee = new Employee({ email, password, role });
        await newEmployee.save();
        res.status(201).json(newEmployee); // Return the created employee as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error });
    }
});

export default router;
