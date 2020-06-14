const express = require('express')
require('./db/mongoose')
const dotenv = require('dotenv')
const userRouter = require('./router/user')
const productRouter = require('./router/product')
const orderRouter = require('./router/order')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)


module.exports = app