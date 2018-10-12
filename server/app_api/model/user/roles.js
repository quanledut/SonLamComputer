const mongoose = require('mongoose')

let roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true } ,
}, {
    toJSON: {
        virtuals: true
    }
});

roleSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles'
})
  
mongoose.model('Role', roleSchema);
