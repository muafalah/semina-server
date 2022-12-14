const Talents = require('../../api/v1/talents/model')
const { BadRequestError, NotFoundError } = require('../../errors')
const { checkingImages } = require('./images')

const createTalents = async (req) => {
    const { name, role, image } = req.body

    // Melakukan pengecekan image, _id image yang dimasukkan sudah benar atau belum
    await checkingImages(image)

    // Mengecek apakah nama talent sudah pernah dipakai sebelumnya
    const checkDuplicate = await Talents.findOne({ name: name, organizer: req.user.organizer })
    if (checkDuplicate) throw new BadRequestError('Nama pembicara sudah pernah digunakan')

    // Memasukkan data talent
    const result = await Talents.create({ name: name, role: role, image: image, organizer: req.user.organizer })

    return result
}

const getAllTalents = async (req) => {
    // Keyword jika ingin melakukan pencarian tertentu
    const { keyword } = req.query

    let condition = { organizer: req.user.organizer }

    // Jika ingin melakukan pencarian tertentu maka akan ditampilkan
    // Namun jika tidak ingin melakukan pencarian tertentu maka akan ditampilkan semua
    if (keyword) {
        condition = {
            ...condition,
            name: { $regex: keyword, $options: 'i' }
        }
    }

    // Melakukan pencarian data talent
    const result = await Talents.find(condition)
        // Data apa saja yang ingin ditampilkan
        .select('_id name role image')
        // Menampilkan data lain dari relasi data
        .populate({
            path: 'image',
            select: '_id name',
        })

    return result
}

const getOneTalents = async (req) => {
    const { id } = req.params

    const result = await Talents.findOne({ _id: id, organizer: req.user.organizer })
        // Data apa saja yang ingin ditampilkan
        .select('_id name role image')
        // Menampilkan data lain dari relasi data
        .populate({
            path: 'image',
            select: '_id name'
        })

    // Menampilkan ini jika data tidak ditemukan
    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`)

    return result
}

const updateTalents = async (req) => {
    const { id } = req.params
    const { name, image, role } = req.body

    // Melakukan pengecekan image, _id image yang dimasukkan sudah benar atau belum
    await checkingImages(image)

    // Pengecekan apakah id talent benar atau tidak
    const check = await Talents.findOne({ _id: id, organizer: req.user.organizer })
    if (!check) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    // Mengecek apakah nama talent sudah pernah dipakai sebelumnya
    const checkDuplicate = await Talents.findOne({ _id: { $ne: id }, name: name, organizer: req.user.organizer })
    if (checkDuplicate) throw new BadRequestError('Nama pembicara sudah pernah digunakan')

    // Memasukkan data talent
    const result = await Talents.findOneAndUpdate(
        { _id: id },
        { name, image, role, organizer: req.user.organizer },
        { new: true, runValidators: true },
    )
        // Data apa saja yang ingin ditampilkan
        .select('_id name role image')
        // Menampilkan data lain dari relasi data
        .populate({
            path: 'image',
            select: '_id name'
        })

    return result
}

const deleteTalents = async (req) => {
    const { id } = req.params

    const result = await Talents.findOneAndDelete({ _id: id, organizer: req.user.organizer })
        // Data apa saja yang ingin ditampilkan
        .select('_id name role image')
        // Menampilkan data lain dari relasi data
        .populate({
            path: 'image',
            select: '_id name'
        })

    // Pengecekan apakah id talent benar atau tidak
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}

const checkingTalents = async (id) => {
    const result = await Talents.findOne({ _id: id })

    // Pengecekan apakah id image benar atau tidak
    if (!result) throw new NotFoundError(`Tidak ada Talent dengan id : ${id}`)

    return result
}

module.exports = {
    createTalents,
    getAllTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents,
}