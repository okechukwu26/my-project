const express = require('express')
const User = require('../model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const sharp = require('sharp')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const userController = require('../controllers/user')
const { sendEmail, deleteAccountEmail } = require('../email/account')
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload image'))
        }
        cb(undefined, true)
    }

})

router.post('/Avatar', auth, upload.single('userImage'), userController.get_Avatar)

router.delete('/Avatar', auth, userController.delete_Avatar)
router.get('/:id/Avatar', userController.upload_Avatar)

router.post('/', userController.sendEmail)
router.post('/login', userController.login_user)
router.get('/me', auth, userController.get_profile)
router.patch('/me', auth, userController.update_user)
router.post('/logout', auth, userController.logout)
router.post('/logoutAll', auth, userController.logout_All)
router.delete('/me', auth, userController.delete_user)


module.exports = router