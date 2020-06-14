const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
require('dotenv/config')
const jwt = require('jsonwebtoken')
const Product = require('./product')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        toLowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().match('password'))
                throw new Error('value must not contain "password"')
        }
    },
    age: {
        type: Number,
        default: false,

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    Avatar: {
        type: Buffer
    }


},
    {
        timestamps: true
    }
)
//populat user with products order
userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'owner'
})
//populate user with products
userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'owner'
})
//generate token for user login and reg
userSchema.methods.generateAuth = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token

}

//find the credential of the user login
userSchema.statics.findCredential = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('invalid login details')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('invalid login details')
    }
    return user




}
//hash password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})
//Delete user products wen user is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Product.deleteMany({ owner: user._id })
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User
