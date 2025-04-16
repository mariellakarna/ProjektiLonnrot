import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookReader.css';

function BookReader() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Haetaan kirjan tiedot backendistä
        fetch(`/api/books/${bookId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kirjaa ei löytynyt');
                }
                return response.json();
            })
            .then((data) => setBook(data))
            .catch((error) => {
                setError(error.message);
                console.error('Virhe haettaessa kirjaa:', error);
            });
    }, [bookId]);

    if (error) {
        return <div>{error}</div>; // Virheilmoitus, jos kirjan lataus epäonnistui
    }

    if (!book) {
        return <div>Ladataan kirjaa...</div>; // Ladataan-teksti, jos kirja ei ole vielä ladattu
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

export default BookReader;
