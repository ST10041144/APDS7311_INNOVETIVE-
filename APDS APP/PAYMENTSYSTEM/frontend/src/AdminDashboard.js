import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

// PropTypes for EmployeesList
EmployeesList.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// Component to create a new employee
const NewEmployee = ({ addEmployee }) => {
    const [employee, setEmployee] = useState({
        email: '',
        password: '',
        role: 'Employee',
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
            setEmployee({ email: '', password: '', role: 'Employee' });
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
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

// PropTypes for NewEmployee
NewEmployee.propTypes = {
    addEmployee: PropTypes.func.isRequired,
};

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all employees from the server
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/employees/fetch');
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
            const response = await fetch('/api/employees/newEmployee', {
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

// Default export
export default AdminDashboard;
