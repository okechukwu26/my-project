const mongoose = require('mongoose')
const order = require('./order')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true
    },
    price: {
        type: Number,
        required: true,
        tim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})



//delete order wen product is deleted
productSchema.pre('remove', async function (next) {
    const user = this
    await Order.deleteMany({ product: user._id })
    next()
})



const Product = mongoose.model('Product', productSchema)

module.exports = Product
