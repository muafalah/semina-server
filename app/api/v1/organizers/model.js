const mongoose = require('mongoose')
const { model, Schema } = mongoose

const organizerSchema = Schema(
    {
        organizer: {
            type: String,
            minLength: [3, 'Panjang nama kategori minimal 3 karakter'],
            maxLength: [100, 'Panjang nama kategori maksimal 100 karakter'],
            required: [true, 'Nama penyelenggara harus diisi'],
        },
    },
    {
        timestamps: true
    },
)

module.exports = model('Organizer', organizerSchema)