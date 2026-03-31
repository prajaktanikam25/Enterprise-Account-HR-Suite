const mongoose = require('mongoose');

const Organization = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    branchName: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('organization', Organization);