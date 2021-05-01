const mysql = require('mysql2/promise')
require('dotenv').config()

// const connect = () => {
//     try {
const db = mysql.createPool({
    host: 'bbghgkymw2dsxofwagqm-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uhhwe83khqkwpdly',
    password: 'iGcuguP1nxOGx23lGRrD',
    database: 'bbghgkymw2dsxofwagqm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

//         return connection
//     } catch (err) {
//         console.log(err)
//     }
// }
// const connect = async () => {

//     try {
//         const connection = mysql.createConnection({
//             "host": "bbghgkymw2dsxofwagqm-mysql.services.clever-cloud.com",
//             "port": 3306,
//             "user": "uhhwe83khqkwpdly",
//             "password": "iGcuguP1nxOGx23lGRrD",
//             "database": "bbghgkymw2dsxofwagqm",
//         })

//         return connection
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

module.exports = db
