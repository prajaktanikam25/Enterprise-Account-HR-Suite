const mongoose = require('mongoose');

const EmployeeOnboardingSchema = mongoose.Schema({
    id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    address: {
        type: String
    },
    designation: {
        type: String
    },
    employeeType: {
        type: String
    },
    department: {
        type: String,
    },
    organization: {
        type: String,
    },
    lastCompanyName: {
        type: String
    },
    lastCTC: {
        type: String
    },
    date_of_joining: {
        type: Date
    },
    salary: {
        type: Number
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
    base_salary: {
        type: Number
    },
    reporting_Manager: {
        type: String
    },
    document: {
        type: Array
    },
    emergency: {
        type: Object
    },
    bank: {
        type: Object
    },
    userName: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('employeeOnboarding', EmployeeOnboardingSchema);