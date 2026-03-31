const mongoose = require('mongoose');

const HolidaySchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    sunday: {
        type: Number,
        required: true,
    },
    holiday: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('holiday', HolidaySchema);