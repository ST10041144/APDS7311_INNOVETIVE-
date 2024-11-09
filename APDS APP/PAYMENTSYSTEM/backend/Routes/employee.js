import express from 'express';
import Employee from '../models/employees.js'; // Assuming Employee is a Mongoose model
import { authenticateJWT } from '../middleware/authMiddleware.js';  // Optional: JWT authentication middleware

const router = express.Router();

// GET: Fetch all employees
router.get('/employees', authenticateJWT, async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await Employee.find();  // Mongoose query to get all employees
        res.json(employees);  // Respond with employees as JSON
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Failed to fetch employees' });
    }
});

// POST: Add a new employee
router.post('/employees', authenticateJWT, async (req, res) => {
    try {
        // Destructure employee details from the request body
        const { email, password, role } = req.body;

        // You might want to validate the data here (email format, password length, etc.)
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new employee document
        const newEmployee = new Employee({ email, password, role });

        // Save the employee to the database
        await newEmployee.save();
        res.status(201).json(newEmployee);  // Respond with the created employee
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Failed to add employee' });
    }
});

// GET: Fetch a single employee by ID
router.get('/employees/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        // Find employee by ID in the database
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);  // Respond with the found employee
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ message: 'Failed to fetch employee' });
    }
});

// PUT: Update an existing employee by ID
router.put('/employees/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { email, password, role } = req.body;

    try {
        // Update employee details in the database
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { email, password, role },
            { new: true }  // Return the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);  // Respond with the updated employee
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Failed to update employee' });
    }
});

// DELETE: Delete an employee by ID
router.delete('/employees/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        // Delete the employee from the database
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });  // Respond with success message
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Failed to delete employee' });
    }
});

export default router;
