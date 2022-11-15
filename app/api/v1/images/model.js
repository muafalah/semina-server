const { model, Schema } = require('mongoose')

let imageSchema = Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true },
)

module.exports = model('Image', imageSchema)