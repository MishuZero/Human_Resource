const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    checkIn: {
        time: Date,
        location: {
            type: { type: String },
            coordinates: []
        }
    },
    checkOut: {
        time: Date,
        location: {
            type: { type: String },
            coordinates: []
        }
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-Day', 'Late'],
        required: true
    }
});

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);