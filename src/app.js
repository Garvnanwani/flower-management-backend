const express = require('express')
require("dotenv").config();

const productsRouter = require('./routes/products');
const testRouter = require('./routes/testRoute');

const app = express()

app.use(express.json())

app.use('/products', productsRouter);
app.use('/', testRouter);

const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})
