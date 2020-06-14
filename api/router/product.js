const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()
const Product = require('../model/product')
const auth = require('../middleware/auth')
const productController = require('../controllers/product')

router.post('/', auth, productController.create_product)

router.get('/', auth, productController.get_all_product)

router.get('/:id', auth, productController.get_one_product)

router.patch('/:id', auth, productController.update_product)

router.delete('/:id', auth, productController.delete_product)





module.exports = router