const Attendance = require('../models/attendanceModel');
const { validationResult } = require('express-validator');

exports.markAttendance = async (req, res) => {
    try {
        const { type, location } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({
            employee: req.user.employeeId,
            date: today
        });

        if (!attendance) {
            attendance = new Attendance({
                employee: req.user.employeeId,
                date: today,
                status: 'Present'
            });
        }

        if (type === 'checkIn') {
            attendance.checkIn = {
                time: new Date(),
                location
            };
        } else {
            attendance.checkOut = {
                time: new Date(),
                location
            };
        }

        await attendance.save();
        res.json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAttendanceReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const attendance = await Attendance.find({
            employee: req.user.employeeId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};