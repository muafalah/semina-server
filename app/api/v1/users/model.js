const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Panjang nama kategori minimal 3 karakter'],
            maxLength: [100, 'Panjang nama kategori maksimal 100 karakter'],
            required: [true, 'Nama kategori harus diisi'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus diisi'],
        },
        password: {
            type: String,
            minLength: [6, 'Panjang kata sandi minimal 6 karakter'],
            required: [true, 'Email harus diisi'],
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default: 'admin',
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: [true, 'Penyelenggara acara harus diisi'],
        },
    },
    {
        timestamps: true
    },
)

// Dijalankan sebelum data yang dimasukkan disimpan
userSchema.pre('save', async function (next) {
    const User = this
    // Password akan dimodifikasi menggunakan bcrypt agar menjadi kode random
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

// Dijalankan untuk mengecek password yang telak di encode
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model('User', userSchema)