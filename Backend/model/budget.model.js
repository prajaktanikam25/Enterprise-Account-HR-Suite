const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    id: {
        type: String
    },
    amount: {
        type: String,
        required: true,
        unique: true
    },
    purpose: {
        type: String,
    },
    date: {
        type: Date,
    },
    department: {
        type: String,
    },
    organization: {
        type: String,
    }
});

module.exports = mongoose.model('budget', BudgetSchema);