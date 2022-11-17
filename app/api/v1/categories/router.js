const express = require('express')
const router = express()
// Import Controller
const { create, index, find, update, destroy } = require('./controller')
const { authenticateUser } = require('../../../middlewares/auth')

// Router API Categories
router.post('/categories', authenticateUser, create)
router.get('/categories', authenticateUser, index)
router.get('/categories/:id', authenticateUser, find)
router.put('/categories/:id', authenticateUser, update)
router.delete('/categories/:id', authenticateUser, destroy)

module.exports = router