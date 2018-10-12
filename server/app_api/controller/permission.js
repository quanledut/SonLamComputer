const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; 

const Policy = mongoose.model('Policy');
const Role = mongoose.model('Role');

const CREATE = 8;
const READ = 4;
const UPDATE = 2;
const DELETE = 1;


const checkPolicyForPermission = (policies, action) => {
    // console.log(policies);
    for (let id in policies) {
        let policy = policies[id];
        if (policy.permission & action) return true 
        // permissionArray = decimalToBinary(policy.permission);

        // switch (action) {
        //     case CREATE:
        //         return permissionArray[3] == 1;
        //     case READ:
        //         return permissionArray[2] == 1;
        //     case UPDATE:
        //         return permissionArray[1] == 1;
        //     case DELETE:
        //         return permissionArray[0] == 1;
        // }
    }
    return false;
}

const checkPermission = async (roles, collectionName, action) => {
    try {
        let policies = await Policy.find({
            collectionName: collectionName,
            roleId: {
                $in: roles
            }
        }).exec();
        if (!policies) return false;

        return checkPolicyForPermission(policies, action);
        // return true
    } catch(err) {
        console.log("Error in finding policy");
        console.log(err)
        return false;
    }

}

const checkPermissionForCollection = (collectionName) => (action) => async (req, res, next) => {
    const roles = req.payload.roles.map((r) => new ObjectId(r._id));
    const allowed = await checkPermission(roles, collectionName, action);
    console.log(collectionName, action, roles)
    if (allowed) {
        next();
    } else {
        res.status(401);
        res.json("Unauthorized");
    }
}

module.exports = {
    checkPermissionForCollection,
    type: {
        CREATE,
        READ,
        UPDATE,
        DELETE    
    }
}