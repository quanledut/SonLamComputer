const mongoose = require('mongoose')

let accessoryTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, trim: true }
}, {
    timestamps: true,
})

mongoose.model('AccessoryType', accessoryTypeSchema)