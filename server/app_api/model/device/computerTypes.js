const mongoose = require('mongoose')

let computerTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true }
})

mongoose.model('ComputerType', computerTypeSchema)
