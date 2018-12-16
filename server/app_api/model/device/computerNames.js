const mongoose = require('mongoose')

let computerNameSchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ComputerType' },
    name: { type: String, required: true, trim: true }
}, {
    timestamps: true,
})

computerNameSchema.index({ type: 1, name: 1 }, { unique: true })

mongoose.model('ComputerName', computerNameSchema)
