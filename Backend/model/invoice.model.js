const mongoose = require('mongoose');

const Invoice = mongoose.Schema({
    invoiceNo: {
        type: Number
    },
    date: {
        type: Date
    },
    companyName: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyCity: {
        type: String
    },
    companyState: {
        type: String
    },
    companyPinCode: {
        type: Number
    },
    companyContact: {
        type: Number
    },
    companyEmail: {
        type: String
    },
    billerName: {
        type: String
    },
    clientEmail: {
        type: String
    },
    clientContact: {
        type: Number
    },
    clientAddress: {
        type: String
    },
    productName: {
        type: String
    },
    quantity: {
        type: Number
    },
    subAmount: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    initialPaidAmt: {
        type: Number
    },
    pendingAmt: {
        type: Number
    },
    remarks: {
        type: String
    },
    staus: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model('invoice', Invoice);