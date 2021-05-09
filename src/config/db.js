const mysql = require('mysql2/promise')
require('dotenv').config()

const db = mysql.createPool({
    host: 'bbghgkymw2dsxofwagqm-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uhhwe83khqkwpdly',
    password: 'iGcuguP1nxOGx23lGRrD',
    database: 'bbghgkymw2dsxofwagqm',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 10,
})

module.exports = db
