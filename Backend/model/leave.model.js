const mongoose = require('mongoose');

const LeaveSchema = mongoose.Schema({
    id: {
        type: String
    },
    empName: {
        type: String,
        required: true
    },
    leaveReason: {
        type: String,
        required: true
    },
    no_of_days: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    status: {
        type: Number
    },
    message: {
        type: String
    },
    department: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('leave', LeaveSchema);