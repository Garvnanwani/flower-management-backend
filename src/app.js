const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Import Routes
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/categories')
const productRouter = require('./routes/products')
const brainTreeRouter = require('./routes/braintree')
const orderRouter = require('./routes/orders')
const usersRouter = require('./routes/users')
const customizeRouter = require('./routes/customize')

const app = express()

// Middlewares
if (process.env.NODE_ENV != 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/api', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/category', categoryRouter)
app.use('/api', brainTreeRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/customize', customizeRouter)

// Run the server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})
