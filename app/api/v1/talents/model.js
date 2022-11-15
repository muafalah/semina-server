const mongoose = require('mongoose')
const { model, Schema } = mongoose

let talentSchema = Schema(
    {
        // Nama Talent
        name: {
            type: String,
            required: [true, 'Nama pembicara harus diisi'],
        },
        // Role Talent
        role: {
            type: String,
            default: '-',
        },
        // Relasi dari Image 
        image: {
            type: mongoose.Types.ObjectId,
            // digunakan untuk menembak data pada table. Ingat, nama harus sama dengan yang di export dari images/model.js
            ref: 'Image',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)