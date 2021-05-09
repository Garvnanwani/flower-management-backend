const express = require('express')
const router = express.Router()
const { getImages, getAllData } = require('../controller/customize')

router.get('/get-slide-image', getImages)
router.post('/dashboard-data', getAllData)

module.exports = router
