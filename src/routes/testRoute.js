const express = require('express');
const router = express.Router();
const connect = require('../config/db');

router.get('/', async (req, res) => {

    try {

        const con = await connect()

        const data = await con.query("SELECT * FROM users")

        console.log("working");

        res.json(data)

    } catch (err) {

        console.log(err);

    }
})

module.exports = router
