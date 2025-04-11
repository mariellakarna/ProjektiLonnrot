const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    content: {type: String, required: true},
    tags: [String],
    filename: String,
    source: String,
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Books', BookSchema);