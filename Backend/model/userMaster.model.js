const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        // required: true
    },
    userName: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,

    },
    organization: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);