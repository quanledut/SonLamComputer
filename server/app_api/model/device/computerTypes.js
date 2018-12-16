const mongoose = require('mongoose')

let computerTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true }
}, {
    timestamps: true,
})

mongoose.model('ComputerType', computerTypeSchema)
