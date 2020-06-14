const User = require('../model/user')
const sharp = require('sharp')
const { sendEmail, deleteAccountEmail } = require('../email/account')

exports.login_user = async (req, res) => {
    try {
        const user = await User.findCredential(req.body.email, req.body.password)
        const token = await user.generateAuth()
        res.send({
            user,
            token,
            count: user.tokens.length
        })



    } catch (error) {
        res.status(400).send({ error: error.message })

    }
}

exports.get_profile = async (req, res) => {
    res.send({
        _id: req.user._id,
        name: req.user.name,
        age: req.user.age,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt

    })
}

exports.update_user = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isvalid = updates.every((update) => allowedUpdates.includes(update))
    if (!isvalid) {
        return res.send({ message: 'invalid update' })
    }
    try {

        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (error) {
        res.status(400).send(error)
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('user logout')
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.logout_All = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
}
exports.delete_user = async (req, res) => {
    try {
        await req.user.remove()
        deleteAccountEmail(req.user.email, req.user.name)
        res.send('user deleted')

    } catch (error) {

    }
}


exports.get_Avatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.Avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}

exports.delete_Avatar = async (req, res) => {
    req.user.Avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(500).send({ error: error.message })
}
exports.upload_Avatar = async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user || !user.Avatar) {
            throw new Error()
        }
        res.set('content-Type', 'image/png')
        res.send(user.Avatar)
    } catch (error) {
        res.status(400).send()
    }

}
exports.sendEmail = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendEmail(user.email, user.name)
        const token = await user.generateAuth()
        res.send({
            name: user.name,
            email: user.email,
            token

        })
    } catch (e) {
        res.status(400).send(e)

    }

}