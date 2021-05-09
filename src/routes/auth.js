const express = require('express')
const router = express.Router()
const { allUser, postSignup, postSignin } = require('../controller/auth')
const { loginCheck, isAuth, isAdmin } = require('../middleware/auth')

router.post('/signup', postSignup)
router.post('/signin', postSignin)
router.post('/user', loginCheck, isAuth, isAdmin, allUser)

module.exports = router
