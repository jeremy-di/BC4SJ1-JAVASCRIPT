import React, { useState, useEffect } from 'react'

const NewLoan = () => {
  const [books, setBooks] = useState([])
  const [bookId, setBookId] = useState('')
  const [dateRetour, setDateRetour] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/books/available-books', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setBooks(data)
        if (data.length > 0) {
          setBookId(data[0].id)
        }
      })
      .catch(error => console.error('Error fetching books:', error))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('/api/loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        book_id: bookId,
        date_retour: dateRetour
      })
    })
      .then(response => {
        if (response.ok) {
          setMessage('Emprunt réussi')
        } else {
          return response.text().then(text => { throw new Error(text) })
        }
      })
      .catch(error => setMessage('Erreur lors de l\'emprunt: ' + error.message))
  }

  return (
    <div>
      <h1>Nouvel Emprunt - Librairie XYZ</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book_id">Livre :</label>
        <select name="book_id" value={bookId} onChange={e => {
          console.log('Book ID selected:', e.target.value)
          setBookId(e.target.value)
        }} required>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.titre}</option>
          ))}
        </select>
        <br />
        <label htmlFor="date_retour">Date de retour prévue :</label>
        <input type="date" name="date_retour" value={dateRetour} onChange={e => setDateRetour(e.target.value)} required />
        <br />
        <button type="submit">Emprunter</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => window.location.href = '/loan'}>Voir mes emprunts</button>
      <button onClick={() => window.location.href = '/'}>Retour à l'accueil</button>
    </div>
  )
}

export default NewLoan