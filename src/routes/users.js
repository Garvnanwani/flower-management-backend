const express = require('express')
const router = express.Router()
const {
    getSingleUser,
    postEditUser,
    changePassword,
} = require('../controller/users')

router.post('/single-user', getSingleUser)
router.post('/edit-user', postEditUser)
router.post('/change-password', changePassword)

module.exports = router
