const Images = require('../../api/v1/images/model')

// Ada 2 Cara
// 1. Kita simpan dulu gambarnya di database, baru kita ambil urlnya
const createImages = async (req) => {
    // Jika file ada maka file akan diupload, namun jika tidak ada maka secara default akan menggunakan avatar
    const result = await Images.create({ name: req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/default.png' })

    return result
}

// 2. Kita ambil urlnya dulu, baru kita simpan gambarnya di database
// const generatorImage = async (req) => {
//    const result = await req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/default.png'
//    return result
// }

module.exports = {
    createImages
}