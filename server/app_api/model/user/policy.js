const mongoose = require('mongoose');

const CONSTANT = {
    CREATE: 8,
    READ: 4,
    UPDATE: 2,
    DELETE: 1
}

let policySchema = new mongoose.Schema({
    // roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    collectionName: { type: String, required: true },
    isCreate: { type: Boolean, default: false},
    isUpdate: { type: Boolean, default: false},
    isDelete: { type: Boolean, default: false},
    isRead: { type: Boolean, default: false},
    // permission: { type: Number, required: true, default: 0 }
          
}, {
    toObject: {
        virtuals: true
    }
});



var virtual = policySchema.virtual('permission');
virtual.get(function() {
        return this.isCreate * CONSTANT.CREATE + this.isRead * CONSTANT.READ
            + this.isUpdate * CONSTANT.UPDATE + this.isDelete * CONSTANT.DELETE
    })
    .set(function(permission) {
        if (permission >= CONSTANT.CREATE) {
            this.isCreate = true
            permission -= CONSTANT.CREATE
        }

        if (permission >= CONSTANT.READ) {
            this.isRead = true
            permission -= CONSTANT.READ
        }

        if (permission >= CONSTANT.UPDATE) {
            this.isUpdate = true
            permission -= CONSTANT.UPDATE
        }

        if (permission >= CONSTANT.DELETE) {
            this.isDelete = true
            permission -= CONSTANT.DELETE
        }
    });

module.exports = {policySchema, CONSTANT}
// export default policySchema;
// mongoose.model('Policy', policySchema);