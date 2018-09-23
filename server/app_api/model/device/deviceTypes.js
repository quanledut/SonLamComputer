const mongoose = require('mongoose')

let deviceTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
})

mongoose.model('DeviceType', deviceTypeSchema)