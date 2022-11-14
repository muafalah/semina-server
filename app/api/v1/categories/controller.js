const Categories = require('./model')

const create = async (req, res, next) => {
    try {
        // Mengambil data dari API body
        const { name } = req.body

        // Menambahkan data ke database
        const result = await Categories.create({ name: name })

        // Mengirimkan respon ke API
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
}