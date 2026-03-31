const mongoose = require('mongoose');

const Attendence = mongoose.Schema({
    empId: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    date: {
        type: Date
    },
    checkInTime: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    attendence: {
        type: Number
    },
    isApproved: {
        type: String
    },
    disableLogout: {
        type: Number
    },
    isDeleted: {
        type: Number
    },
    organization: {
        type: String
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('attendence', Attendence);