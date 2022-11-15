const Images = require('../../api/v1/images/model')
const { NotFoundError } = require('../../errors')

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

// Diperuntukkan untuk melakukan pengecekan image ketika sedang digunakan pada datatable lainnya
const checkingImages = async (id) => {
    const result = await Images.findOne({ _id: id })

    // Pengecekan apakah id image benar atau tidak
    if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id : ${id}`)

    return result
}

module.exports = {
    createImages,
    checkingImages,
}