import React from 'react'
import {useParams, Link } from 'react-router-dom'
import '../styles/AuthorDetails.css'

function AuthorDetails() {
    const { authorName } = useParams()

    // const authors = [
    //     { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
    //     { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit']},
    //     { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa']},
    //   ];

    const authors = [
      { name: 'Elias Lönnrot', books: [{ id: 1, title: 'Kalevala' }, { id: 2, title: 'Kanteletar' }] },
      { name: 'Aleksis Kivi', books: [{ id: 3, title: 'Seitsemän veljestä' }, { id: 4, title: 'Nummisuutarit' }] },
      { name: 'Minna Canth', books: [{ id: 5, title: 'Työmiehen vaimo' }, { id: 6, title: 'Anna Liisa' }] },
    ];

      const author = authors.find((a) => a.name === decodeURIComponent(authorName))

      if (!author) {
        return <div>Kirjailijaa ei löytynyt.</div>
      }

  return (
    // <div className='author-details'>
    //     <h1>{author.name}</h1>
    //     <h2>Teokset</h2>
    //     <ul>
    //         {author.books.map((book, index) => (
    //             <li key={index}>{book}</li>
    //         ))}
    //     </ul>
    // </div>

    <div className="author-details">
      <h1>{author.name}</h1>
      <h2>Teokset</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link> {/* Link to BookReader */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AuthorDetails