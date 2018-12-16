const mongoose = require('mongoose')

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

let accessorySchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessoryType' },
    description: String,
    image_url: String,
    amount: Number,
    price: {type: Number, get: getPrice, set: setPrice},
    guaranteeDuration: Number
})

mongoose.model('Accessory', accessorySchema)