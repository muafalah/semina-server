const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    // Digunakan untuk menambahkan URL Database
    urlDb: process.env.URL_MONGODB_DEV,
    // Digunakan untuk membatasi masa expired penggunaan JWT
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
}