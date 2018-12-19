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
    return str + 'đ'
}

let subAccessorySchema = new mongoose.Schema({
    accessoryId: { type: mongoose.Schema.Types.ObjectId },
    computerSeries: String,
    computerName: String,
    type: String,
    guaranteeDuration: {type: Number, default: 0}, 
    // price: {type: Number, set: setPrice, get: getPrice},
    price: {type: Number, set: setPrice},
    date: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toJSON: { virtuals: true }
})

subAccessorySchema.virtual('formatPrice').get(function() {
    return getPrice(this.price)
});

let subDeviceSchema = new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    type: String,
    guaranteeDuration: {type: Number, default: 0}, 
    // price: {type: Number, set: setPrice, get: getPrice},
    price: {type: Number, set: setPrice},
    date: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toJSON: { virtuals: true }
});


subDeviceSchema.virtual('formatPrice').get(function() {
    return getPrice(this.price)
});

// subDeviceSchema.set('toObject', {virtuals: true})
// subDeviceSchema.set('toJson', {virtuals: true})

let serviceSchema = new mongoose.Schema({
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
    date: { type: Date, default: Date.now },
    accessories: [subAccessorySchema],
    devices: [subDeviceSchema],
    totalPrice: { type: Number, default: 0 },
    status: { type: Number, default: DEFAUT_STATUS.NEW },
}, {
    toJSON: { virtuals: true },
    toJSON: { virtuals: true }
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

// serviceSchema.virtual('formatTotalPrice').get(function() {
//     return getPrice(this.totalPrice)
// });

mongoose.model('Service', serviceSchema)

module.exports = {
    getPrice
}