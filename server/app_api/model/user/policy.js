const mongoose = require('mongoose');

let policySchema = new mongoose.Schema({
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    collectionName: { type: String, required: true },
    permission: { type: Number, required: true, default: 0 }
});

policySchema.index({ roleId: 1, collectionName: 1 }, { unique: true })


policySchema.methods.generatePermission = (c=0, r=0, u=0, d=0) => {
    return c * 8 + r * 4 + u * 2 + d * 1;
}

mongoose.model('Policy', policySchema);