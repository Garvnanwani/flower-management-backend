const express = require('express');
const router = express.Router();
const connect = require('../db');

router.get('/', async (req, res) => {

    try {

        const con = await connect()

        const data = await con.query("SELECT * FROM test")

        await con.query("INSERT INTO test (name) VALUES (?)", ['Garv'])

        console.log("working");

        res.json(data)

    } catch (err) {

        console.log(err);

    }
})

module.exports = router
