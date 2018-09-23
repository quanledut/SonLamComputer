const mongoose = require('mongoose')

let subStorageHistory = new mongoose.Schema({
    amount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    priceIn: { type: Number, default: 0}
})

let storageHistorySchema = new mongoose.Schema({
    deviceId: mongoose.Schema.Types.ObjectId,
    history: [subStorageHistory]
})

mongoose.model('StorageHistory', storageHistorySchema);