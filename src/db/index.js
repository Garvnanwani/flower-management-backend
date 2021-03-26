const mysql = require('mysql2/promise')

async function connect() {
    try {
        const connection = mysql.createConnection({
            "host": "sql6.freemysqlhosting.net",
            "port": 3306,
            "user": "sql6400678",
            "password": "KSJpxykPK1",
            "database": "sql6400678",
        })

        return connection
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { connect }
