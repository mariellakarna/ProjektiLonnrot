import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/BookReader.css'

function BookReader() {
    const { bookId } = useParams()
    const [book, setBook] = useState(null)

//     useEffect(() => {
//         fetch(`http://localhost:5000/api/books/${bookId}`)
//       .then((response) => response.json())
//       .then((data) => setBook(data))
//       .catch((error) => console.error('Error fetching book:', error));
//     }, [bookId]);

//     if (!book) {
//         return <div>Loading...</div>
//     }

//   return (
//     <div className='book-reader'>
//         <div className="book-header">
//         <h1>{book.title}</h1>
//         <h3>Kirjoittanut: {book.author}</h3>
//       </div>
//       <div className="book-content">
//         <p>{book.content}</p>
//       </div>
//     </div>
//   );

useEffect(() => {
    // Simulate fetching book data from the backend
    const books = [
      { id: 1, title: 'Kalevala', author: 'Elias Lönnrot', content: 'Kalevala content goes here...' },
      { id: 2, title: 'Kanteletar', author: 'Elias Lönnrot', content: 'Kanteletar content goes here...' },
      { id: 3, title: 'Seitsemän veljestä', author: 'Aleksis Kivi', content: 'Seitsemän veljestä content goes here...' },
      { id: 4, title: 'Nummisuutarit', author: 'Aleksis Kivi', content: 'Nummisuutarit content goes here...' },
      { id: 5, title: 'Työmiehen vaimo', author: 'Minna Canth', content: 'Työmiehen vaimo content goes here...' },
      { id: 6, title: 'Anna Liisa', author: 'Minna Canth', content: 'Anna Liisa content goes here...' },
    ];

    const book = books.find((b) => b.id === parseInt(bookId));
    setBook(book);
  }, [bookId]);

  if (!book) {
    return <div>Kirjaa ei löytynyt.</div>;
  }

  return (
    <div className="book-reader">
      <h1>{book.title}</h1>
      <h3>Kirjoittanut: {book.author}</h3>
      <div className="book-content">
        <p>{book.content}</p>
      </div>
    </div>
  );
}

export default BookReader