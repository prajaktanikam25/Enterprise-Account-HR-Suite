const mongoose = require('mongoose');

const Taxation = mongoose.Schema({
    organization: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
    },
    companyName: {
        type: String,
    },
    clientName: {
        type: String,
    },
    paymentMode: {
        type: String,
    },
    // commission: {
    //     type: Object,
    // },
    invoiceNo: {
        type: String,
    },
    gst: {
        type: Number,
    },
    gstAmount: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    },
    paidAmount: {
        type: Number
    },
    pendingAmount: {
        type: Number
    },
    employee: {
        type: String
    },
    date: {
        type: Date
    },
    status: {
        type: String
    },
    isDeleted: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('taxation', Taxation);