const express = require('express')
const bodyParser = require('body-parser')
const booksrouter = require('./router/books')
const usersRouter = require('./router/users')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 3000
const db = require('./services/database')

const JWT_SECRET = "HelloThereImObiWan"
function authenticateToken(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}

express()
.use(bodyParser.json())
.use(cors(corsOptions))
.use(cookieParser())
.use('/api/books',booksrouter)
.use('/api/users',usersRouter)
.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.json({ message: 'Déconnexion réussie' })
})
.post('/api/loan', authenticateToken, (req, res) => {
    if (!req?.user?.id) {
      return res.status(401).send('Unauthorized');
    }
    const user_id = req.user.id;
    const { book_id, date_retour } = req.body;
    const date_emprunt = new Date().toISOString().slice(0, 10);
    console.log(book_id)
    db.query('SELECT statut FROM livres WHERE id = ?', [book_id], (err, results) => {
      if (err) throw err;
        console.log(results)
      if (results[0].statut === 'disponible') {
        db.query(
          'INSERT INTO emprunt (id_utilisateur, id_livre, date_emprunt, date_retour_prevue) VALUES (?, ?, ?, ?)',
          [user_id, book_id, date_emprunt, date_retour],
          (err, results) => {
            if (err) throw err;
            db.query('UPDATE livres SET statut = ? WHERE id = ?', ['emprunté', book_id], (err, results) => {
              if (err) throw err;
              res.status(200).send('Emprunt réussi');
            });
          }
        );
      } else {
        res.status(400).send("Le livre n'est pas disponible");
      }
    })
  })
.get('/api/loans', authenticateToken, (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
  
    const user_id = req.user.id
    const query = `
      SELECT emprunt.*, livres.titre, DATEDIFF(CURRENT_DATE, emprunt.date_emprunt) AS duree_detention 
      FROM emprunt 
      INNER JOIN livres ON emprunt.id_livre = livres.id 
      WHERE emprunt.id_utilisateur = ?
    `
    db.query(query, [user_id], (err, results) => {
      if (err) throw err
      res.json(results)
    })
})
.get('/api/session', authenticateToken,(req, res) => {
    if (req?.user) {
        res.json({ user: req.user })
    } else {
        res.status(401).json({ message: 'Non authentifié' })
    }
})
.get('/api/statistics', (req, res) => {
    const totalBooksQuery = 'SELECT COUNT(*) AS total_books FROM livres'
    const totalUsersQuery = 'SELECT COUNT(*) AS total_users FROM utilisateurs'

    db.query(totalBooksQuery, (err, booksResult) => {
        if (err) throw err
        db.query(totalUsersQuery, (err, usersResult) => {
            if (err) throw err
            res.json({
                total_books: booksResult[0].total_books,
                total_users: usersResult[0].total_users
            })
        })
    })
})
.get('/api/currentloans', authenticateToken, (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
  
    const user_id = req.user.id
    const query = `
      SELECT emprunt.*, livres.titre 
      FROM emprunt
      INNER JOIN livres ON emprunt.id_livre = livres.id
      WHERE emprunt.id_utilisateur = ? AND emprunt.date_retour_effectif IS NULL
    `
    db.query(query, [user_id], (err, results) => {
      if (err) throw err
      res.json(results)
    })
  })
  
.post('/api/returnloan', authenticateToken, (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
  
    const user_id = req.user.id
    const { book_id } = req.body
  
    const query = `
      UPDATE emprunt SET date_retour_effectif = CURRENT_DATE 
      WHERE id_utilisateur = ? AND id_livre = ?
    `
    db.query(query, [user_id, book_id], (err, results) => {
      if (err) throw err
  
      const updateQuery = "UPDATE livres SET statut = 'disponible' WHERE id = ?"
      db.query(updateQuery, [book_id], (err, results) => {
        if (err) throw err
        res.status(200).send('Retour effectué avec succès')
      })
    })
  })
.use(express.static(path.join(__dirname, "./webpub")))
.get("*", (_, res) => {
    res.sendFile(
      path.join(__dirname, "./webpub/index.html")
    )
})
.listen(PORT, () => {
    console.info(`Serveur démarré sur le port ${PORT}`)
})