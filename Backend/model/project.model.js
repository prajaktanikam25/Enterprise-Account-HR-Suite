const mongoose = require('mongoose');

const Project = mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectManager: {
        type: String,
        required: true
    },
    projectHandleBy: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    milestone: {
        type: Array
    },
    task: {
        type: Array
    },
    issue: {
        type: Array
    },
    dependency: {
        type: Array
    },
    status: {
        type: String
    },
    createdBy: {
        type: Number
    },
    updatedBy: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('project', Project);