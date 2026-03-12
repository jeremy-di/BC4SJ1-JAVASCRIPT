import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        fetch(`/api/books/${bookId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setBook(data[0]))
            .catch(error => console.error('Erreur:', error));

        fetch('/api/users/user-role', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setUserRole(data.role))
            .catch(error => setUserRole('Guest'));
    }, [bookId]);

    const handleBack = () => {
        navigate('/books');
    };

    const handleEdit = () => {
        navigate(`/edit_book/${bookId}`);
    };

    const handleDelete = () => {
        console.log('Supprimer le livre:', bookId);
    };

    if (!book) {
        return <p>Livre non trouvé</p>;
    }

    return (
        <div className="container">
            <div className="details">
                <h3>{book.titre}</h3>
                <img className="book-image" src={book.photo_url} alt={book.titre} />
                <p>Auteur : {book.auteur}</p>
                <p>Année de publication : {book.date_publication}</p>
                <p>ISBN : {book.isbn}</p>
                <p>URL de l'image : {book.photo_url}</p>
            </div>
            <div className="back-button">
                <button onClick={handleBack}>Retour à la liste des livres</button>
                {userRole === 'admin' && (
                    <>
                        <button onClick={handleEdit}>Modifier le livre</button>
                        <button onClick={handleDelete}>Supprimer le livre</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookDetails