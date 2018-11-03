const mongoose = require('mongoose')
const DEFAUT_STATUS = {
    NEW: 0,
    PAY: 1
}

let subAccessorySchema = new mongoose.Schema({
    computerName: String,
    type: String,
    guaranteeDuration: Number, 
    price: Number,
    date: { type: Date, default: Date.now }
})

let subDeviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    guaranteeDuration: Number, 
    price: Number,
    date: { type: Date, default: Date.now }
})


let serviceSchema = new mongoose.Schema({
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    customer_name: { type: String, required: true },
    customer_id_card: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    accessories: [subAccessorySchema],
    devices: [subDeviceSchema],
    totalPrice: { type: Number, default: 0 },
    status: { type: Number, default: DEFAUT_STATUS.NEW },
    date: { type: Date, default: Date.now },

})

serviceSchema.methods.calculatePrice = function() {
    let totalPrice = 0
    for (let i=0; i < this.devices.length; i++) {
        totalPrice += this.devices[i].price
    }

    this.totalPrice = totalPrice
}

mongoose.model('Service', serviceSchema)