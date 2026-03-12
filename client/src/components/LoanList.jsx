import React, { useState, useEffect } from 'react'

const LoanList = () => {
  const [loans, setLoans] = useState([])
  const [alertVisible, setAlertVisible] = useState(false)

  useEffect(() => {
    fetch('/api/loans', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setLoans(data)
        checkAlerts(data)
      })
      .catch(error => console.error('Error fetching loans:', error))
  }, [])

  const checkAlerts = (loans) => {
    const hasOverdue = loans.some(loan => loan.duree_detention > 30)
    setAlertVisible(hasOverdue)
  }

  return (
    <div>
      <h1>Liste des Emprunts - Librairie XYZ</h1>
      {alertVisible && (
        <div style={{ backgroundColor: 'yellow', textAlign: 'center' }}>
          Attention : Vous détenez un livre depuis plus de 30 jours. Merci de le retourner dès que possible.
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Livre</th>
            <th>Date d'emprunt</th>
            <th>Date de retour prévue</th>
            <th>Date de retour effectif</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.titre}</td>
              <td>{loan.date_emprunt}</td>
              <td>{loan.date_retour_prevue}</td>
              <td>{loan.date_retour_effectif}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.location.href = '/'}>Retour à l'accueil</button>
      <button onClick={() => window.location.href = '/newloan'}>Effectuer un nouvel emprunt</button>
      {loans.length > 0 && (
        <button onClick={() => window.location.href = '/returnloan'}>Effectuer un retour</button>
      )}
    </div>
  )
}

export default LoanList