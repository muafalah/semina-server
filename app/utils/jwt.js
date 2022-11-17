const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpiration } = require('../config')

// Digunakan untuk membuat token JWT baru
const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiration,
    })
    return token
}

// Digunakan untuk mengecek apakah token benar atau salah
const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret)

module.exports = {
    createJWT,
    isTokenValid,
}