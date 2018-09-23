const mongoose = require('mongoose')

let subServiceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: Number,
    date: Date
})

let serviceHistorySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    services: [subServiceSchema]
})

mongoose.model('ServiceHistory', serviceHistorySchema)