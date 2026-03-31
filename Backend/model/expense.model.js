const mongoose = require('mongoose');

const Expense = mongoose.Schema({
    purpose: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    amount: {
        type: Number,
    },
    remark: {
        type: String
    },
    paymentMode: {
        type: String,
    },
    date: {
        type: Date,
    },
    approved: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    status: {
        type:String
    },
    isDeleted: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model('expense', Expense);