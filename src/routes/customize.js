const express = require('express')
const router = express.Router()
const { getAllData } = require('../controller/customize')

router.post('/dashboard-data', getAllData)

module.exports = router
