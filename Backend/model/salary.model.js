const mongoose = require('mongoose');

const SalarySchema = mongoose.Schema({
    id: {
        type: String
    },
    empName: {
        type: String
    },
    department: {
        type: String,
    },
    designation: {
        type: String
    },
    organization: {
        type: String,
    },
    date_of_joining: {
        type: Date
    },
    no_of_holiday: {
        type: Number
    },
    working_day: {
        type: Number
    },
    present_day: {
        type: Number
    },
    late_day: {
        type: Number
    },
    half_day: {
        type: Number
    },
    absent_day: {
        type: Number
    },
    bankName: {
        type: String
    },
    accountNo: {
        type: String
    },
    LIC: {
        type: Number
    },
    PF: {
        type: Number
    },
    PT: {
        type: Number
    },
    incentive: {
        type: Number
    },
    salary: {
        type: Number
    },
    gross_amount: {
        type: Number
    },
    total_deduction: {
        type: Number
    },
    net_amount: {
        type: Number
    },
    mode_of_payment: {
        type: String,
    },
    date: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('salary', SalarySchema);