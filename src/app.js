const express = require('express')
const app = express()
const { connect } = require('./db')
const mysql = require('mysql2/promise')

const PORT = process.env.PORT || 5000

async function query() {
    try {
        const con = await connect()
        const data = await con.query("SELECT * FROM temp")
        console.log(data[0])
        const insert = await con.query("INSERT INTO temp (name) VALUES (?)", ['Garv'])
        console.log(insert[0])
        console.table(data[0])
    } catch (err) {
        console.log(err);
    }
}

query()

app.listen(PORT, () => {
    console.log(` Listening on Port ${PORT}`);
})
