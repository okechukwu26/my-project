const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quantity: {
        type: String,
        default: 1
    }

})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order