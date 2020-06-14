const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Order = require('../model/order')
const mongoose = require('mongoose')
const Product = require('../model/product')
const orderController = require('../controllers/order')



router.post('/', auth, orderController.create_order)

router.get('/', auth, orderController.orders_get_all)

router.get('/:id', auth, orderController.orders_get_One)

router.delete('/deleteAll', auth, orderController.delete_all)

router.delete('/:id', auth, orderController.delete_One)



module.exports = router


