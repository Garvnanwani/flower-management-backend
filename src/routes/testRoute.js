const express = require('express')
const router = express.Router()
const connect = require('../config/db')

router.get('/', async (req, res) => {
    try {
        const con = await connect()

        const sql = 'SELECT * FROM users'

        const [rows, fields] = await con.query(sql)

        res.json(rows)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
