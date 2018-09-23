const mongoose = require('mongoose')

let computerNameSchema = new mongoose.Schema({
    computerTypeId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true }
})

computerNameSchema.index({ computerTypeId: 1, name: 1 }, { unique: true })

mongoose.model('ComputerName', computerNameSchema)
