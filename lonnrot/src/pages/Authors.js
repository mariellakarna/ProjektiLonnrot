import React from 'react'
import '../styles/Authors.css'
import { Link } from 'react-router-dom'

function Authors() {
  const authors = [
    { name: 'Elias Lönnrot', books: ['Kalevala', 'Kanteletar'] },
    { name: 'Aleksis Kivi', books: ['Seitsemän veljestä', 'Nummisuutarit']},
    { name: 'Minna Canth', books: ['Työmiehen vaimo', 'Anna Liisa']},
  ];

  return (
    // <div>Authors</div>
    <div className='authors-page'>
      <h1>Kirjailijat ja heidän teoksensa</h1>
      <div className='authors-grid'>
      {authors.map((author, index) => (
          <Link
            key={index}
            to={`/author/${encodeURIComponent(author.name)}`}
            className="author-card"
          >
            <h2>{author.name}</h2>
            <p>
              {author.books.slice(0,2).join(', ')} { }
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Authors