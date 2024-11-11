import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        role: 'Employee',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

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
                <select name="role" onChange={handleChange} value={employee.role} required>
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
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

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/employees/fetch');
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
            setError('Error fetching employees');
        } finally {
            setLoading(false);
        }
    };

    const addEmployee = async (employee) => {
        try {
            const response = await axios.post('/api/employees/newEmployee', employee);
            setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className="admin-container">
            <header>
                <h1>Admin Dashboard</h1>
            </header>
            <div className="top-nav">
                <img src="/paysherelogo.jpg" alt="Admin Logo" className="logo" />
                <div className="profile">
                    <img src="/user_icon.jpg" alt="Profile" className="profile-icon" />
                    <span className="username">Admin</span>
                    {/* Changed div to button for better accessibility */}
                    <button
                        className="logout-menu"
                        onClick={handleLogout}
                        aria-label="Logout"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
                        tabIndex={0}
                    >
                        Logout
                    </button>
                </div>
            </div>
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
                <Route path="newEmployee" element={<NewEmployee addEmployee={addEmployee} />} />
            </Routes>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminDashboard;

// Code Attribution 
// This code was referenced from mdn web docs 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// Author name mdm web docs 
// async function (mozilla.org)