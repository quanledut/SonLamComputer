const mongoose = require('mongoose')

let deviceTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, trim: true }
}, {
    timestamps: true,
})

mongoose.model('DeviceType', deviceTypeSchema)