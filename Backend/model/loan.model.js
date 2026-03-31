const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
    id: {
        type: String
    },
    organization: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    employee: {
        type: String,
    },
    loanType: {
        type: String,
    },
    requestAmount: {
        type: Number,
        required: true,
    },
    disbursedDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
    disbursedAmt: {
        type: Number,
        required: true,
    },
    gurantee: {
        type: String,
    },
    approvedBy: {
        type: String,
    },
    status: {
        type: String
    },
    isDeleted: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model('loan', LoanSchema);