const mysql = require('mysql2/promise')
require("dotenv").config();

const connect = async () => {

    try {
        const connection = mysql.createConnection({
            "host": "bbghgkymw2dsxofwagqm-mysql.services.clever-cloud.com",
            "port": 3306,
            "user": "uhhwe83khqkwpdly",
            "password": "iGcuguP1nxOGx23lGRrD",
            "database": "bbghgkymw2dsxofwagqm",
        })

        return connection
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = connect
