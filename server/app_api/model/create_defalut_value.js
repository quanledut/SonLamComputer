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
    } catch(err) {
        console.log(err);
    }

    if (!admin) {
        console.log("Crreating data");
        try {
            const roleAdmin = await create_role_admin();
            const roleUser = await create_role_user();

            try {
                admin = await create_admin(roleAdmin.id);
                user = await create_user(roleUser.id);  
                
                await create_policies(roleAdmin.id, true);
                await create_policies(roleUser.id, false);
            } catch(err) {
                console.log("Error in creating admin");
            }
        } catch(err) {
            console.log("Error in create roles");
            console.log(err);
        }
    }
}


const create_role_admin = async () => {
    let role = new Role()
    let result
    role.name = 'root_admin'
    result = await role.save();

    return result;
}

const create_role_user = async () => {
    let role = new Role()
    let result
    role.name = 'user'
    result = await role.save();

    return result;
}

const create_user = async (roleId) => {
    let user = new User();
    let result;

	user.username = 'user';
	user.email = 'user@user.com';
    user.fullname = 'user';
    user.roles = [roleId];
    password = user.setPassword('user');
    result = await user.save();

    return result
}
const create_admin = async (roleId) => {
    let user = new User();
    let result;

	user.username = 'thanhson';
	user.email = 'son@gmail.com';
    user.fullname = 'Lê Phước Thành Sơn';
    user.roles = [roleId];
    password = user.setPassword('thanhson');
    result = await user.save();

    return result
}

const create_policies = async (roleId, isRoot) => {
    Object.keys(mongoose.connection.models).forEach(async (collection) => {
        try {
            await create_policy(roleId, collection, isRoot)
        } catch(err) {
            console.log("Error in creating policy for table", collection);
            console.log(err)
        }
    })    
}

const create_policy = async (roleId, collectionName, isRoot) => {
    if (!isRoot) return;
    if (!collectionName) return null;
    let policy = new Policy();
    policy.roleId = roleId;
    policy.collectionName = collectionName;
    policy.permission = policy.generatePermission(1, 1, 1, 1);
    await policy.save();

}

create_data();