import React from 'react'
import {useParams} from 'react-router-dom'
import '../styles/AuthorDetails.css'

function AuthorDetails() {
    const { authorName } = useParams()

    const authors = [
        { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
        { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit']},
        { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa']},
      ];

      const author = authors.find((a) => a.name === decodeURIComponent(authorName))

      if (!author) {
        return <div>Kirjailijaa ei löytynyt.</div>
      }

  return (
    <div className='author-details'>
        <h1>{author.name}</h1>
        <h2>Teokset</h2>
        <ul>
            {author.books.map((book, index) => (
                <li key={index}>{book}</li>
            ))}
        </ul>
    </div>
  )
}

export default AuthorDetails