const mongoose = require('mongoose')
const {policySchema, DEFAULT_PERMISSION_NAMES} = require('./policy')

let roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true } ,
    policies: [policySchema]
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
