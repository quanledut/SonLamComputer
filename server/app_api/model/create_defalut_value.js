const mongoose = require( 'mongoose' );

const User = mongoose.model('User');
const Role = mongoose.model('Role');
const Policy = mongoose.model('Policy');

const create_data = async () => {
    let admin;
    try {
        admin = await User.findOne({
            'username': 'thanhson'
        })
    } catch (err) {

    }

    if (!admin) {
        console.log("creating data");

        const roleId = await create_role_admin();

        if (!roleId) {

            console.log("Cannot create role")

        } else {

            await create_policies(roleId)

            const adminId = await create_admin(roleId)
            if (!adminId) {
                console.log("Cannot create admin")
            }
        }
    } else {
        console.log(admin)
    }
}

const create_role_admin = async () => {
    let role = new Role()
    let result
    role.name = 'root_admin'
    try {
        result = await role.save();
    } catch(err) {
        console.log(err);
    }

    return result ? result._id : ""
}

const create_admin = async (roleId) => {
    let user = new User();
    let result;

	user.username = 'thanhson';
	user.email = 'son@gmail.com';
    user.fullname = 'Lê Phước Thành Sơn';
    user.roles = [roleId];
    user.setPassword('thanhson');

    try {
        result = await user.save();
    } catch(err) {
        console.log(err);
    }

    return result ? result : null

    

}

const create_policies = async (roleId) => {
    Object.keys(mongoose.connection.models).forEach(async (collection) => {
        await create_policy(roleId, collection)
    })    
}

const create_policy = async (roleId, collectionName) => {
    if (!collectionName) return null;
    console.log(collectionName)
    let policy = new Policy();
    policy.roleId = roleId;
    policy.collectionName = collectionName;
    policy.permission = policy.generatePermission(1, 1, 1, 1);
    try {
        await policy.save()
    } catch(err) {
        console.log(err);
    }
}

create_data();