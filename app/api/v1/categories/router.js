const express = require('express')
const router = express()
// Import Controller
const { create } = require('./controller')

// Router API Categories
router.post('/categories', create)

router.get('/categories', (req, res) => {
    res.status(200).json({
        message: "Endpoint Categories"
    })
})

module.exports = router