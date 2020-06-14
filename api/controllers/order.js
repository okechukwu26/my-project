const Order = require('../model/order')
const Product = require('../model/product')
exports.orders_get_all = async (req, res) => {
    try {
        const order = await Order.find().populate('product')
        await req.user.populate('orders').execPopulate()

        if (!order) {
            return res.status(404).send({ message: 'no order found' })
        }
        res.send({
            name: req.user.orders,
            count: order.length,
            orders: order.map(res => {
                return {
                    _id: res._id,
                    product: res.product,
                    quantity: res.quantity
                }
            })
        })
        console.log(req.user.orders);

    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

exports.create_order = async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            product: req.body.productId,
            owner: req.user._id
        })
        if (!order.product) {
            return res.status(404).send({ message: 'invalid id' })
        }
        await order.save()
        res.send(order)

    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }
}
exports.orders_get_One = async (req, res) => {
    try {
        const _id = req.params.id
        const order = await Order.findById(_id).populate('product')
        if (!order) {
            return res.status(404).send({
                message: 'no order found'
            })
        }
        res.send(order)
    } catch (error) {
        res.status(500).send({
            error: 'invalid order '
        })
    }
}
exports.delete_all = async (req, res) => {
    try {
        const order = await Order.deleteMany()
        res.send(' All order has been deleted')

    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

exports.delete_One = async (req, res) => {
    try {
        const _id = req.params.id
        const order = await Order.findByIdAndRemove(_id)
        res.send({
            message: 'order deleted'
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
