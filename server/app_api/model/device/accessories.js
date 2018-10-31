const mongoose = require('mongoose')

let accessorySchema = new mongoose.Schema({
    computerName: { type: mongoose.Schema.Types.ObjectId, ref: 'ComputerName' },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceType' },
    description: String,
    image_url: String,
    amount: Number,
    price: Number,
    guaranteeDuration: Number
})

mongoose.model('Accessory', accessorySchema)