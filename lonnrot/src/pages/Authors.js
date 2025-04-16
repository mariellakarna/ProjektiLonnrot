// import React from 'react'
// import '../styles/Authors.css'
// import { Link } from 'react-router-dom'

// function Authors() {
//   const authors = [
//     { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
//     { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit']},
//     { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa']},
//   ];

//   return (
//     // <div>Authors</div>
//     <div className='authors-page'>
//       <h1>Kirjailijat ja heidän teoksensa</h1>
//       <div className='authors-grid'>
//       {authors.map((author, index) => (
//           <Link
//             key={index}
//             to={`/author/${encodeURIComponent(author.name)}`}
//             className="author-card"
//           >
//             <h2>{author.name}</h2>
//             <p>
//               {author.books.slice(0,2).join(', ')} { }
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Authors

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Authors.css';

//function Authors() {
  //const [authors, setAuthors] = useState([]);
  //const [error, setError] = useState(null);
  // function Authors() {
  //   // Kovakoodattu lista kirjailijoista ja heidän teoksistaan
  //   const authors = [
  //     { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
  //     { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit'] },
  //     { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa'] },
  //   ];
    //const [authors, setAuthors] = useState([]);
  //const [error, setError] = useState(null);

  /* useEffect(() => {
    // Haetaan kaikki kirjailijat backendistä
    fetch('http://localhost:5000/api/books/authors')  // Oletetaan, että tässä on reitti kaikkiin kirjailijoihin
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => {
        console.error('Virhe kirjailijoiden latauksessa:', err);
        setError('Kirjailijoiden lataus epäonnistui');
      });
  }, []); */

  //if (error) return <div>{error}</div>;
  //sif (authors.length === 0) return <div>Ladataan kirjailijoita...</div>;


  function Authors(){
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //testi
    //const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // <-- tämä puuttui

    useEffect(() => {
      // Haetaan kaikki kirjailijat backendistä
      fetch('/api/books/authors')  // Oletetaan, että tässä on reitti kaikkiin kirjailijoihin
        .then(res => {
          if (!res.ok) {
            throw new Error('Kirjailijoita ei löytynyt');
          }
          return res.json();
        })
        .then(data => {
          setAuthors(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Virhe kirjailijoiden latauksessa:', err);
          setError('Kirjailijoiden lataus epäonnistui');
          setLoading(false);
        });
    }, []);

    //testi
    const filteredAuthors = authors.filter(author =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Ladataan kirjailijoita...</div>;
    if (error) return <div>{error}</div>;
    //if (authors.length === 0) return <div>Ladataan kirjailijoita...</div>;

    

  // return (
  //   <div className='authors-page'>
  //     <h1>Kirjailijat ja heidän teoksensa</h1>
      
  //     <div className='authors-grid'>
  //       {authors.map((author) => (
  //         <Link
  //           key={author.name}
  //           to={`/author/${encodeURIComponent(author.name)}`}
  //           className="author-card"
  //         >
  //           <h2>{author.name}</h2>
  //           <p>{author.books.slice(0, 2).map(book => book.title).join(', ')}</p> {/* Näytetään kaksi ensimmäistä kirjaa */}
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className='authors-page'>
      <h1>Kirjailijat ja heidän teoksensa</h1>

      <input
        type="text"
        placeholder="Etsi kirjailijaa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="author-search"
      />

      <div className='authors-grid'>
        {filteredAuthors.map((author) => (
          <Link
            key={author.name}
            to={`/author/${encodeURIComponent(author.name)}`}
            className="author-card"
          >
            <h2>{author.name}</h2>
            <p>{author.books.slice(0, 5).map(book => book.title).join(', ')}</p>
          </Link>
        ))}
      </div>
    </div>
  );

}

export default Authors;
