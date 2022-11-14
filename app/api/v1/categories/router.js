const express = require('express')
const router = express()

// Router API Categories
router.get('/categories', (req, res) => {
    res.status(200).json({
        message: "Endpoint Categories"
    })
})

module.exports = router