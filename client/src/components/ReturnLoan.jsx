import React, { useState, useEffect } from 'react';

const ReturnLoan = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/currentloans', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setLoans(data))
      .catch(error => console.error('Error fetching loans:', error));
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('/api/returnloan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        book_id: selectedLoan
      })
    })
      .then(response => {
        if (response.ok) {
          setMessage('Retour effectué avec succès')
          setLoans(loans.filter(loan => loan.id_livre !== selectedLoan))
        } else {
          return response.text().then(text => { throw new Error(text) })
        }
      })
      .catch(error => setMessage('Erreur lors du retour: ' + error.message))
  }

  return (
    <div>
      <h1>Retour d'emprunt - Librairie XYZ</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book_id">Emprunt à retourner :</label>
        <select name="book_id" value={selectedLoan} onChange={e => setSelectedLoan(e.target.value)} required>
          <option value="">Sélectionnez un emprunt</option>
          {loans.map(loan => (
            <option key={loan.id_livre} value={loan.id_livre}>{loan.titre}</option>
          ))}
        </select>
        <br />
        <button type="submit">Retourner</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => window.location.href = '/loans'}>Voir mes emprunts</button>
      <button onClick={() => window.location.href = '/'}>Retour à l'accueil</button>
    </div>
  )
}

export default ReturnLoan