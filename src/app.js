const express = require('express')

const productsRouter = require('./routes/products');

const app = express()

const { connect } = require('./db')

app.use('/products', productsRouter);

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
