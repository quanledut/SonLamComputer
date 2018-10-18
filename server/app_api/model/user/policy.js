const mongoose = require('mongoose');

const CONSTANT = {
    CREATE: 8,
    READ: 4,
    UPDATE: 2,
    DELETE: 1
}

const DEFAULT_PERMISSION_NAMES = ["isCreate", "isRead", "isUpdate", "isDelete"]
// const DEFAULT_PERMISSIONS = {
//     isCreate: { type: Boolean, default: false},
//     isUpdate: { type: Boolean, default: false},
//     isDelete: { type: Boolean, default: false},
//     isRead: { type: Boolean, default: false},
// }

const DEFAULT_PERMISSIONS = DEFAULT_PERMISSION_NAMES.reduce((permission, item) => {
    permission[item] = { type: Boolean, default: false}
    return permission
}, {})

let policySchema = new mongoose.Schema({
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    collectionName: { type: String, required: true },
    ...DEFAULT_PERMISSIONS
}, {
    toObject: {
        virtuals: true
    }
}, {
    toJSON: {
        virtuals: true 
    }
});

policySchema.methods.generatePermission = function(){
    return this.isCreate * CONSTANT.CREATE + this.isRead * CONSTANT.READ
    + this.isUpdate * CONSTANT.UPDATE + this.isDelete * CONSTANT.DELETE
}


var virtual = policySchema.virtual('permission');
virtual
    .get(function() {
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

mongoose.model('Policy', policySchema);
module.exports = {CONSTANT, DEFAULT_PERMISSION_NAMES}
// export default policySchema;
