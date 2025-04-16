//bookDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)  // <-- varmista oikea portti ja endpoint
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => {
        console.error('Virhe ladattaessa kirjaa:', err);
        setError('Kirjan lataus epäonnistui');
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!book) return <div>Ladataan kirjaa...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="italic mb-4">Kirjoittanut: {book.author}</p>
      <pre className="whitespace-pre-wrap overflow-auto">{book.content}</pre>
    </div>
  );
}
  /* return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="italic mb-4">Kirjoittanut: {book.author}</p>
      <pre className="whitespace-pre-wrap">{book.content}</pre>
    </div>
  );
} */

export default BookDetails;
