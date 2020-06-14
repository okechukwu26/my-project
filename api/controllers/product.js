const Product = require('../model/product')
exports.create_product = async (req, res) => {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    })
    try {
        await product.save()
        res.status(201).send(product)

    } catch (error) {
        res.status(400).send({
            error: error.message
        })

    }
}
exports.get_all_product = async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.name) {
        match.name = req.query.name
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {

        await req.user.populate({
            path: 'products',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }

        }).execPopulate()
        res.status(200).send(req.user.products)
        console.log(req.user.products);

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.get_one_product = async (req, res) => {
    try {
        const _id = req.params.id
        const product = await Product.findOne({ _id, owner: req.user._id })
        if (!product) {
            return res.status(404).send({
                message: 'No product found'
            })
        }
        res.send(product)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

exports.update_product = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'price', 'quantity']
    const isvalid = updates.every(update => allowedUpdate.includes(update))
    if (!isvalid) {
        return res.status(400).send('invalid update')
    }
    try {
        const _id = req.params.id
        const product = await Product.findOne({ _id, owner: req.user._id })
        if (!product) {
            return res.status(404).send()
        }
        updates.forEach(update => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.delete_product = async (req, res) => {
    try {
        const _id = req.params.id
        const product = await Product.findOneAndDelete({ _id, owner: req.user._id })
        if (!product) {
            return res.status(404).send('no product found')
        }

        res.status(200).send('product deleted')
    } catch (error) {
        res.status(500).send(error)
    }
}