require('dotenv').config();

const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');
//const Book = require('./models/Book');
const bookRoutes = require('./route/books');

const app = express();
connectDB();

/* mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
  
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); */


app.use(cors());
app.use(express.json());

//reitit
app.use('/api/books', bookRoutes);

// test api
app.get('/', (req, res) => {
    res.send('Welcome to the Lonnrot API!');
});


// // Save new book to database
// app.post('/api/books', async (req, res) => {
//     try {
//         const newBook = new Book(req.body);
//         const saved = await newBook.save();
//         res.status(201).json(saved);
//     } catch (error) {
//         console.error('Error saving book:', error);
//         res.status(400).json({ message: 'Error saving book' });
//     }
// });


// // Get all books from database
// app.get('/api/books', async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.status(200).json(books);
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).json({ message: 'Error fetching books' });
//     }
// });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//console.log(process.env.MONGODB_URI);
//console.log(process.env.PORT);