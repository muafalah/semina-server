const express = require('express')
const router = express()
// Import Controller
const { create, index, find, update, destroy } = require('./controller')
const { authenticateUser } = require('../../../middlewares/auth')

// Router API Categories
router.post('/categories', create)
router.get('/categories', authenticateUser, index)
router.get('/categories/:id', find)
router.put('/categories/:id', update)
router.delete('/categories/:id', destroy)

module.exports = router