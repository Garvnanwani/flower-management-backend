const express = require('express');
const router = express.Router();
const connect = require('../config/db');

router.get('/', async (req, res) => {

    try {

        const con = await connect()

        const sql = "SELECT * FROM users"

        const data = await con.query(sql)

        console.log("working");

        res.json(data[0][0])

    } catch (err) {

        console.log(err);

    }
})

module.exports = router
