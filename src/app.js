const express = require('express')
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Routes
const productsRouter = require('./routes/products');
const testRouter = require('./routes/testRoute');

const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/', testRouter);


// Run the server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})
