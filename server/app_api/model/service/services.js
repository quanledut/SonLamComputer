const mongoose = require('mongoose')

let subDeviceSchema = new mongoose.Schema({
    computerName: String,
    deviceType: String,
    guaranteeDuration: Number, 
    price: Number,
    date: { type: Date, default: Date.now }
})

let serviceSchema = new mongoose.Schema({
    serivceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    customer_name: { type: String, required: true },
    customer_id_card: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    devices: [subDeviceSchema],
    totalPrice: { type: Number, default: 0 }
})

mongoose.model('Serivce', serviceSchema)