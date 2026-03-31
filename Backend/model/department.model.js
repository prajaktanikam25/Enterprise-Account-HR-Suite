const mongoose = require('mongoose');

const Department = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    organization:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('department', Department);