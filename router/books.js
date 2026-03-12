const express = require('express')
const router = express.Router()
const db = require('./../services/database')

router

.get('/', (_, res) => {
    const sql = 'SELECT * FROM livres'
    db.query(sql, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

.post('/', (req, res) => {
    const { title, author, date_publication, isbn, description, status, cover } = req.body
    const sql = 'INSERT INTO livres (titre, auteur, date_publication, isbn, description, statut, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [title, author, date_publication, isbn, description, status || "disponible", cover], (err) => {
        if (err) res.staus(400).send("Erreur d'envoi")
        res.send('Livre ajouté')
    })
})
.get('/available-books', (req, res) => {
    db.query("SELECT id, titre FROM livres WHERE statut = 'disponible'", (err, results) => {
        if (err) throw err
        res.json(results)
    })
})
.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM livres WHERE id = ?'
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

.put('/:id', (req, res) => {
    const { title, author, published_date, isbn, description, status, photo_url } = req.body
    const sql = 'UPDATE livres SET titre = ?, auteur = ?, date_publication = ?, isbn = ?, description = ?, statut = ?, photo_url = ? WHERE id = ?'
    db.query(sql, [title, author, published_date, isbn, description, status, photo_url, req.params.id], (err, result) => {
        if (err) throw err
        res.send('Livre mis à jour')
    })
})

.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM livres WHERE id = ?'
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err
        res.send('Livre supprimé')
    })
})

module.exports = router