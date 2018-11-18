const mongoose = require('mongoose')

let serviceTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true }
})

mongoose.model('ServiceType', serviceTypeSchema)