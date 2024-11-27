const Employee = require('../models/employeeModel');
const { validationResult } = require('express-validator');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', 'firstName lastName email');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate('userId', 'firstName lastName email');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create employee
exports.createEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        Object.assign(employee, req.body);
        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.remove();
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};