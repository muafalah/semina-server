const Users = require('../../api/v1/users/model')
const Organizers = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors')

const createOrganizers = async (req) => {
    const { organizer, name, email, password, confirmPassword, role } = req.body

    // Mengecek apakah password dan confirmPassword sama atau tidak
    if (password !== confirmPassword) {
        throw new BadRequestError('Kata sandi dan Konfirmasi kata sandi tidak cocok')
    }

    const checkDuplicateOrganizer = await Organizers.findOne({ organizer: organizer })
    if (checkDuplicateOrganizer) throw new BadRequestError('Nama Pembicara sudah pernah digunakan')

    // Untuk membuat Organizer baru
    const result = await Organizers.create({ organizer: organizer })

    // Untuk membuat User baru berdasarkan Organizer yang telah dibuat
    const users = await Users.create({
        name: name,
        email: email,
        password: password,
        role: role,
        organizer: result._id,
    })

    // Untuk menghapus password agar lebih secure
    delete users._doc.password

    return users
}

const createUsers = async (req) => {
    const { name, email, password, confirmPassword, role } = req.body

    if (password !== confirmPassword) throw new BadRequestError('Kata sandi dan konfirmasi kata sandi tidak cocok')

    const result = await Users.create({
        name: name,
        email: email,
        password: password,
        role: role,
        organizer: req.user.organizer,
    })

    return result
}

const getAllUsers = async (req) => {
    const result = await Users.find()

    return result
}

module.exports = {
    createOrganizers,
    createUsers,
    getAllUsers,
}