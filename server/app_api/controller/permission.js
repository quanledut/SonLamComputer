const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; 

const Policy = mongoose.model('Policy');
const Role = mongoose.model('Role');

const CREATE = 'create';
const READ = 'read';
const UPDATE = 'update';
const DELETE = 'delete';

const decimalToBinary = (dec) => {
    binary = [];
    while (dec != 0) {
        binary.push(dec % 2);
        dec = Math.floor( dec / 2);
    }
    return binary.reverse();
}

const checkPolicyForPermission = (policy, action) => {
    permissionArray = decimalToBinary(policy.permission);

    switch (action) {
        case CREATE:
            return permissionArray[3] == 1;
        case READ:
            return permissionArray[2] == 1;
        case UPDATE:
            return permissionArray[1] == 1;
        case DELETE:
            return permissionArray[0] == 1;
        default:
            return false
    }
}

const checkPermission = async (roles, collectionName, action) => {
    try {
        let policy = await Policy.findOne({
            collectionName: collectionName,
            roleId: {
                $in: roles
            }
        }).exec();
        if (!policy) return false;

        return checkPolicyForPermission(policy, action);
        // return true
    } catch(err) {
        console.log("Error in finding policy");
        console.log(err)
        return false;
    }

}

const checkPermissionMiddleWare = (collectionName, action) => async (req, res, next) => {
    const roles = req.payload.roles.map((r) => new ObjectId(r._id));
    const allowed = await checkPermission(roles, collectionName, action);
    if (allowed) {
        next();
    } else {
        res.status(401);
        res.json("Unauthorized");
    }
}

module.exports = {
    checkPermissionMiddleWare,
    type: {
        CREATE,
        READ,
        UPDATE,
        DELETE    
    }
}