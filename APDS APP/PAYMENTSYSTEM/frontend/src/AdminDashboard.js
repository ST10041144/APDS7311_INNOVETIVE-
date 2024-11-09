import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './AdminDashboard.css';

const EmployeesList = ({ employees }) => (
    <div className="employee-list-container">
        <h2 className="page-title">Employees List</h2>
        <table className="employee-table">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                    <tr key={emp.id}>
                        <td>{emp.email}</td>
                        <td>{emp.password}</td>
                        <td>{emp.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const NewEmployee = ({ addEmployee }) => {
    const [employee, setEmployee] = useState({
        email: '',
        password: '',
        role: 'Employee',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEmployee(employee);
        setEmployee({
            email: '',
            password: '',
            role: 'Employee',
        });
    };

    return (
        <div className="new-employee-form">
            <h2 className="page-title">Create New Employee</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    value={employee.email}
                    required
                />
                <input 
                    name="password" 
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
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                </select>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees');  // Adjust the endpoint as needed
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const addEmployee = async (employee) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
            const newEmployee = await response.json();
            setEmployees([...employees, newEmployee]);
        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

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
                <Route path="employees" element={<EmployeesList employees={employees} />} />
                <Route path="newEmployee" element={<NewEmployee addEmployee={addEmployee} />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
