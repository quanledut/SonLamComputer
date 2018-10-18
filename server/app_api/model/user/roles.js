const mongoose = require('mongoose')

let roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true } 
}, {
    toObject: {
        virtuals: true
    }, 
    toJSON: {
        virtuals: true
    }
});

roleSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles'
})

roleSchema.virtual('policies', {
    ref: 'Policy',
    localField: '_id',
    foreignField: 'roleId'
})

  
mongoose.model('Role', roleSchema);
