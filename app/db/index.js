// Import mongoose 
const mongoose = require('mongoose')

// Import URL Database untuk dipanggil
const { urlDb } = require('../config')

// Menghubungkan Database dengan ExpressJS
mongoose.connect(urlDb)

// Menyimpan koneksi ke dalam constant database
const db = mongoose.connection

// Export Database agar bisa digunakan di file lainnya
module.exports = db