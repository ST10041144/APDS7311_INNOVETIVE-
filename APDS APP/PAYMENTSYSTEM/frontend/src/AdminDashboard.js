import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './AdminDashboard.css';

// Component to display the list of employees
const EmployeesList = ({ employees }) => (
    <div className="employee-list-container">
        <h2 className="page-title">Employees List</h2>
        <table className="employee-table">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="2">No employees found</td>
                    </tr>
                ) : (
                    employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

// Component to create a new employee
const NewEmployee = ({ addEmployee }) => {
    const [employee, setEmployee] = useState({
        email: '',
        password: '',
        role: 'employee', // Default role to 'employee'
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(employee);
            setEmployee({ email: '', password: '', role: 'employee' });
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to add employee. Please check the details.');
        }
    };

    return (
        <div className="new-employee-form">
            <h2 className="page-title">Create New Employee</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={employee.email}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={employee.password}
                    required
                />
                <select
                    name="role"
                    onChange={handleChange}
                    value={employee.role}
                    required
                >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all employees from the server
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            // Ensure the URL matches your backend route
            const response = await fetch('https://localhost:5000/api/employees'); 
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error(error);
            setError('Error fetching employees');
        } finally {
            setLoading(false);
        }
    };
    

    // Add a new employee to the server
    const addEmployee = async (employee) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add employee');
            }

            const newEmployee = await response.json();
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    };

    // Fetch employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="admin-container">
            <header>
                <h1>Admin Dashboard</h1>
            </header>
            <div className="action-cards">
                <Link to="employees" className="card">
                    <img src="/employeeListAdmin.jpg" alt="View Employees" />
                    <p>View Employees</p>
                </Link>
                <Link to="newEmployee" className="card">
                    <img src="/AddEmployeesAdmin.jpg" alt="Create Employee" />
                    <p>Create New Employee</p>
                </Link>
            </div>

            <Routes>
                <Route
                    path="employees"
                    element={
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <EmployeesList employees={employees} />
                        )
                    }
                />
                <Route
                    path="newEmployee"
                    element={<NewEmployee addEmployee={addEmployee} />}
                />
            </Routes>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminDashboard;