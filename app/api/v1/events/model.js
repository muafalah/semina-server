const mongoose = require('mongoose')
const { model, Schema } = mongoose

const ticketCategorySchema = Schema(
    {
        type: {
            type: String,
            required: [true, 'Tipe tiket harus diisi'],
        },
        price: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        statusTicketCategory: {
            type: Boolean,
            enum: [true, false],
            default: true,
        },
        expired: {
            type: Date,
        },
    },
    { timestamps: true }
)

const eventSchema = Schema(
    {
        title: {
            type: String,
            minLength: [3, 'Panjang judul acara minimal 3 karakter'],
            maxLength: [100, 'Panjang judul acara maksimal 100 karakter'],
            required: [true, 'Judul acara harus diisi'],
        },
        price: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            required: [true, 'Tanggal dan waktu acara harus diisi'],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline acara harus diisi'],
        },
        keyPoint: {
            type: [String],
        },
        venueName: {
            type: String,
            required: [true, 'Tempat acara harus diisi'],
        },
        statusEvent: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft',
        },
        ticket: {
            type: [ticketCategorySchema],
            required: [true, 'Tiket acara harus diisi'],
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
            required: [true, 'Gambar acara harus diisi'],
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Kategori acara harus diisi'],
        },
        talent: {
            type: mongoose.Types.ObjectId,
            ref: 'Talent',
            required: [true, 'Pembicara acara harus diisi'],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: [true, 'Penyelenggara acara harus diisi'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)