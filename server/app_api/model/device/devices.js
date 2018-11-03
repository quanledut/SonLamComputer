const mongoose = require('mongoose')

let deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceType' },
    description: [String],
    image_url: String,
    amount: Number,
    price: String,
    guaranteeDuration: Number
})

deviceSchema.index({ type: 1, name: 1 }, { unique: true })


mongoose.model('Device', deviceSchema)