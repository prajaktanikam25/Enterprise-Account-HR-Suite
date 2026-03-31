const mongoose = require('mongoose');

const CommissionSchema = mongoose.Schema({
    id: {
        type: String
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    name: {
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

module.exports = mongoose.model('commission', CommissionSchema);