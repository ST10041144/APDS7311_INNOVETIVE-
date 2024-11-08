import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './AdminDashboard.css';

const Admin = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John', surname: 'Doe', role: 'Manager', employeeId: 'E123' },
        { id: 2, name: 'Jane', surname: 'Smith', role: 'Developer', employeeId: 'E124' },
        { id: 3, name: 'Robert', surname: 'Brown', role: 'Designer', employeeId: 'E125' }
    ]);

    const [newEmployee, setNewEmployee] = useState({ name: '', surname: '', role: '', employeeId: '' });

    const addEmployee = () => {
        if (newEmployee.name && newEmployee.surname && newEmployee.role && newEmployee.employeeId) {
            setEmployees([
                ...employees,
                { ...newEmployee, id: employees.length + 1 }
            ]);
            setNewEmployee({ name: '', surname: '', role: '', employeeId: '' });
            alert('Employee added successfully!');
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="action-cards">
                <Link to="employees" className="card">
                    <p>View List of Employees</p>
                </Link>
                <Link to="create-employee" className="card">
                    <p>Create New Employee</p>
                </Link>
            </div>

            <Routes>
                {/* View Employee List */}
                <Route
                    path="employees"
                    element={
                        <div>
                            <h2>Employee List</h2>
                            <ul>
                                {employees.map((employee) => (
                                    <li key={employee.id}>
                                        {employee.name} {employee.surname} - {employee.role} (ID: {employee.employeeId})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                />

                {/* Create New Employee */}
                <Route
                    path="create-employee"
                    element={
                        <div>
                            <h2>Create New Employee</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addEmployee();
                                }}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="First Name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Last Name"
                                    value={newEmployee.surname}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role"
                                    value={newEmployee.role}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="employeeId"
                                    placeholder="Employee ID"
                                    value={newEmployee.employeeId}
                                    onChange={handleInputChange}
                                />
                                <button type="submit">Add Employee</button>
                            </form>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
};

export default Admin;
