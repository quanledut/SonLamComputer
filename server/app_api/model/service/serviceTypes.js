const mongoose = require('mongoose')

let serviceTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

mongoose.model('ServiceType', serviceTypeSchema)