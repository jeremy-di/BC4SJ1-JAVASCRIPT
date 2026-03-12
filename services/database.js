const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'libr',
    password: 'NIEN97BF21OZEFJOZEO',
    database: 'library'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Database Connected !')
})

module.exports = db