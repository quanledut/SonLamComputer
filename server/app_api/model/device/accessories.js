const mongoose = require('mongoose')

let accessorySchema = new mongoose.Schema({
    computerName: { type: mongoose.Schema.Types.ObjectId, ref: 'ComputerName' },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessoryType' },
    description: String,
    image_url: String,
    amount: Number,
    price: Number,
    guaranteeDuration: Number
})

accessorySchema.index({ type: 1, computerName: 1 }, { unique: true })


mongoose.model('Accessory', accessorySchema)