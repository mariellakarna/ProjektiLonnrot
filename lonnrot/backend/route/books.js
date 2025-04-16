const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books — kaikki kirjat (ilman sisältöä)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}, 'title author'); // ei haeta koko contentia tässä
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Kirjojen hakeminen epäonnistui.' });
    }
});

// GET /api/books/authors — ryhmittelee kirjat kirjailijoittain
router.get('/authors', async (req, res) => {
    console.log('GET request to /api/books/authors received'); // Tämä lokittaa konsoliin
    try {
        console.log('Fetching authors...');
        const authors = await Book.aggregate([
            { $group: { _id: "$author", books: { $push: { id: "$_id", title: "$title" } } } }
        ]);

        console.log('Authors fetched:', authors);
        res.json(authors.map(author => ({
            name: author._id,
            books: author.books
        })));
    } catch (err) {
        console.error('Error:', err); // Tämä lokittaa virheet konsoliin
        res.status(500).json({ message: err.message });
    }
});

// GET /api/books/authors/:name — hakee yksittäisen kirjailijan kirjat
router.get('/authors/:name', async (req, res) => {
    try {
        const authorName = decodeURIComponent(req.params.name);
        const books = await Book.find({ author: authorName });

        if (books.length === 0) {
            return res.status(404).json({ error: 'Kirjailijaa ei löytynyt.' });
        }

        const author = {
            name: authorName,
            books: books.map(book => ({
                id: book._id,
                title: book.title,
            })),
        };

        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/books/:id — yksittäinen kirja koko sisällöllä
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Kirjaa ei löytynyt.' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Kirjan hakeminen epäonnistui.' });
    }
});





module.exports = router;
