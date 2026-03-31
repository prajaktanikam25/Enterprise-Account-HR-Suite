const mongoose = require('mongoose');

const IncentiveSchema = mongoose.Schema({
    id: {
        type: String
    },
    type: {
        type: String,
        required: true,
    },
    amountRange: {
        type: String,
    },
    incentiveAmount: {
        type: Number,
    },
    tlIncentive: {
        type: Number
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true });

module.exports = mongoose.model('incentive', IncentiveSchema);