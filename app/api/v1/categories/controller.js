const Categories = require('./model')

// Membuat data baru
const create = async (req, res, next) => {
    try {
        // Mengambil data dari API body
        const { name } = req.body

        // Menambahkan data ke database
        const result = await Categories.create(
            { name: name }
        )

        if (!result) return res.status(404).json({ message: 'Nama kategori belum dimasukkan' })

        // Mengirimkan respon ke API
        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan semua data
const index = async (req, res, next) => {
    try {
        const result = await Categories.find()

        if (result < 1) return res.status(404).json({ message: 'Tidak ada kategori yang ditambahkan' })

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan data tunggal
const find = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Categories.findOne(
            { _id: id }
        )

        if (!result) return res.status(404).json({ message: 'Id kategori tidak ditemukan' })

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {

        const { id } = req.params
        const { name } = req.body

        const result = await Categories.findOneAndUpdate(
            { _id: id },
            { name: name },
            { new: true, runValidators: true }
        )

        if (!result) return res.status(404).json({ message: 'Id kategori tidak ditemukan' })

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Categories.findOneAndRemove(
            { _id: id }
        )

        if (!result) return res.status(404).json({ message: 'Id kategori tidak ditemukan' })

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
}