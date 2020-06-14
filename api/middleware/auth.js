const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv/config')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error('no user found')
        }

        req.user = user
        req.token = token

        next()

    } catch (error) {
        res.status(500).send({ error: 'please authenticate' })
    }
}

module.exports = auth