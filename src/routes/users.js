const express = require('express')
const router = express.Router()
const {
    getSingleUser,
    postEditUser,
    changePassword,
    // getAllUser,
    // postAddUser,
    // getDeleteUser,
} = require('../controller/users')

router.post('/signle-user', getSingleUser)
router.post('/edit-user', postEditUser)
router.post('/change-password', changePassword)

// router.get('/all-user', getAllUser)
// router.post('/add-user', postAddUser)
// router.post('/delete-user', getDeleteUser)

module.exports = router
