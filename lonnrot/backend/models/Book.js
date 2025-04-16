/* const mongoose = require('mongoose');

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

// vie kirjan Kirjasto kokoelmaan
module.exports = mongoose.model('Book', BookSchema, 'Kirjasto'); */
//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  content: { type: String, required: true },
  tags: [String],
  filename: String,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', BookSchema, 'Kirjasto');

//export default Book;
module.exports = Book;
