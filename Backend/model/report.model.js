const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    id: {
        type: String
    },
    organization: {
        type: String,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    totalIncome: {
        type: Number,
    },
    totalExpense: {
        type: Number,
    },
    totalGSTAmount: {
        type: Number
    },
    deductionLabel: {
        type: String
    },
    deductionPer: {
        type: Number
    },
    deductionAmount: {
        type: Number
    }
}, { timestamps: true }
);

module.exports = mongoose.model('report', ReportSchema);