// /* import React from 'react'
// import {useParams, Link } from 'react-router-dom'
// import '../styles/AuthorDetails.css'

// function AuthorDetails() {
//     const { authorName } = useParams()

//     // const authors = [
//     //     { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
//     //     { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit']},
//     //     { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa']},
//     //   ];

//     const authors = [
//       { name: 'Elias Lönnrot', books: [{ id: 1, title: 'Kalevala' }, { id: 2, title: 'Kanteletar' }] },
//       { name: 'Aleksis Kivi', books: [{ id: 3, title: 'Seitsemän veljestä' }, { id: 4, title: 'Nummisuutarit' }] },
//       { name: 'Minna Canth', books: [{ id: 5, title: 'Työmiehen vaimo' }, { id: 6, title: 'Anna Liisa' }] },
//     ];

//       const author = authors.find((a) => a.name === decodeURIComponent(authorName))

//       if (!author) {
//         return <div>Kirjailijaa ei löytynyt.</div>
//       }

//   return (
//     // <div className='author-details'>
//     //     <h1>{author.name}</h1>
//     //     <h2>Teokset</h2>
//     //     <ul>
//     //         {author.books.map((book, index) => (
//     //             <li key={index}>{book}</li>
//     //         ))}
//     //     </ul>
//     // </div>

//     <div className="author-details">
//       <h1>{author.name}</h1>
//       <h2>Teokset</h2>
//       <ul>
//         {author.books.map((book) => (
//           <li key={book.id}>
//             <Link to={`/book/${book.id}`}>{book.title}</Link> {/* Link to BookReader */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default AuthorDetails 
// */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/AuthorDetails.css';

function AuthorDetails() {
  const { authorName } = useParams(); // Haetaan URL-parametri
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Haetaan kirjailijan tiedot backendistä
    fetch(`/api/books/authors/${encodeURIComponent(authorName)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Kirjailijaa ei löytynyt');
        }
        return response.json();
      })
      .then(data => {
        setAuthor(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [authorName]);  // Haetaan tiedot aina, kun authorName muuttuu

  if (loading) {
    return <div>Ladataan...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!author) {
    return <div>Kirjailijaa ei löytynyt.</div>;
  }

  return (
    <div className="author-details">
      <h1>{author.name}</h1>
      <h2>Teokset</h2>
      <ul>
        {author.books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link> {/* Linkki BookReaderiin */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorDetails;
