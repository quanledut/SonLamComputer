const mongoose = require('mongoose')
const DEFAUT_STATUS = {
    NEW: 0,
    PAY: 1
}

const setPrice = (number) => {
    let temp = ("" + number).replace(/\D+/g, "")
    if (temp.length == 0) temp = 0
    return parseInt(temp)
}

const getPrice = (number) => {
    let temp = number
    let remain = (temp % 1000).toString()
    while (remain.length <= 2 && temp >= 1000) remain = "0" + remain
    let str = "" + remain
    temp = Math.floor(temp / 1000)
    while (temp > 0) {
        remain = (temp % 1000).toString()
        while (remain.length <= 2 && temp >= 1000) remain = "0" + remain
        str = remain + "." + str
        temp = Math.floor(temp / 1000)
    }
    return str
}

let subAccessorySchema = new mongoose.Schema({
    computerName: String,
    type: String,
    guaranteeDuration: Number, 
    price: {type: Number, set: setPrice},
    date: { type: Date, default: Date.now }
})

let subDeviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    guaranteeDuration: Number, 
    price: {type: Number, set: setPrice},
    date: { type: Date, default: Date.now }
})


let serviceSchema = new mongoose.Schema({
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'UseInfo', required: true },
    date: { type: Date, default: Date.now },
    accessories: [subAccessorySchema],
    devices: [subDeviceSchema],
    totalPrice: { type: Number, default: 0 },
    status: { type: Number, default: DEFAUT_STATUS.NEW },
})

serviceSchema.methods.calculatePrice = function() {
    let totalPrice = 0
    for (let i=0; i < this.devices.length; i++) {
        totalPrice += this.devices[i].price
    }
    for (let i=0; i < this.accessories.length; i++) {
        totalPrice += this.accessories[i].price
    }

    this.totalPrice = totalPrice
}

mongoose.model('Service', serviceSchema)