const mongoose = require('mongoose')

let deviceSchema = new mongoose.Schema({
    computerName: { type: mongoose.Schema.Types.ObjectId, ref: 'ComputerName' },
    deviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceType' },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    description: String,
    image_url: String,
    amount: Number,
    price: Number,
    guaranteeDuration: Number
})

mongoose.model('Device', deviceSchema)