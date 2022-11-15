const express = require('express')
const router = express()

// Import Controller
const { create } = require('./controller')

// Import Multer
const upload = require('../../../middlewares/multer')

router.post('/images', upload.single('avatar'), create)

module.exports = router