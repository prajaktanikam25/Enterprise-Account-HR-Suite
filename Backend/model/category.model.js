const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('category', CategorySchema);