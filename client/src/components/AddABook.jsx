import React, { useState } from 'react'

const AddBook = () => {
    const [cover, setCover] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [datePublication, setDatePublication] = useState('')
    const [isbn, setIsbn] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setSuccess(false)

        const bookData = {
            cover,
            title,
            author,
            description,
            date_publication: datePublication,
            isbn
        }

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData),
                credentials: 'include'
            })

            if (response.ok) {
                setSuccess(true)
                setCover('')
                setTitle('')
                setAuthor('')
                setDescription('')
                setDatePublication('')
                setIsbn('')
            } else {
                const errorData = await response.json()
                setErrors(errorData.errors || ['Une erreur est survenue'])
            }
        } catch (error) {
            setErrors([error.message])
        }
    }

    return (
        <div>
            {success ? (
                <div>
                    <p>Le livre a été ajouté avec succès.</p>
                    <button onClick={() => window.location.href = 'books'}>
                        Retour à la gestion des livres
                    </button>
                </div>
            ) : (
                <div>
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="cover">URL de l'image :</label>
                        <input
                            type="text"
                            name="cover"
                            value={cover}
                            onChange={(e) => setCover(e.target.value)}
                            required
                        />
                        <label htmlFor="title">Titre :</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="author">Auteur :</label>
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="description">Description :</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="date_publication">Date de Publication :</label>
                        <input
                            type="date"
                            name="date_publication"
                            value={datePublication}
                            onChange={(e) => setDatePublication(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="isbn">ISBN :</label>
                        <input
                            type="text"
                            name="isbn"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            required
                        />
                        <br />
                        <button type="submit">Ajouter le Livre</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddBook