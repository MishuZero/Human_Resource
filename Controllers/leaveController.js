const Leave = require('../models/leaveModel');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

exports.createLeaveRequest = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;
        const leave = new Leave({
            employee: req.user.employeeId,
            leaveType,
            startDate,
            endDate,
            reason
        });
        
        await leave.save();

        // Notify HR
        await sendEmail({
            email: 'hr@company.com',
            subject: 'New Leave Request',
            message: `New leave request from ${req.user.firstName} ${req.user.lastName}`
        });

        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('employee', 'userId')
            .populate('approvedBy', 'firstName lastName');
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const leave = await Leave.findById(req.params.id);
        
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leave.status = status;
        leave.approvedBy = req.user._id;
        await leave.save();

        res.json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};