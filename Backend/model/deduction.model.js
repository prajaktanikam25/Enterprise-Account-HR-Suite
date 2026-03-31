const mongoose = require('mongoose');

const DeductionSchema = mongoose.Schema({
    id: {
        type: String
    },
    purpose: {
        type: String,
    },
    percentage: {
        type: Number,
    },
    department:{
        type: String,
    },
    organization:{
        type: String,
    },
    status: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('deduction', DeductionSchema);