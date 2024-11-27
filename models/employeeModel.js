const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    contact: {
        phone: String,
        emergencyContact: String,
        address: String
    },
    documents: [{
        type: String,
        name: String,
        uploadDate: Date
    }]
});

module.exports = mongoose.model('Employee', employeeSchema);