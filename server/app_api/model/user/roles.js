const mongoose = require('mongoose')

let roleSchema = new mongoose.Schema({
    name: { type: String, required: true } ,
});

mongoose.model('Role', roleSchema);
