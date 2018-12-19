
const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;

const ctrlUser = require('../controller/user/users');

const route_user = (router) => {
    const checkPermission = checkPermissionForCollection("UserInfo", 'userId')
    /* User Api */
    router.post('/users/register', ctrlUser.register);
    router.post('/users/login', ctrlUser.login);
    router.post('/users', auth, checkPermission(permission.type.CREATE), ctrlUser.createUser)

    router.get('/users', auth, checkPermission(permission.type.READ), ctrlUser.find)
    router.get('/users/:userId', auth, checkPermission(permission.type.READ), ctrlUser.findById)
    router.put('/users/:userId/changePassword', auth, checkPermission(permission.type.UPDATE), ctrlUser.changePassword)
    router.put('/users/:userId', auth, checkPermission(permission.type.UPDATE), ctrlUser.updateById)

    router.delete('/users/:userId', auth, checkPermission(permission.type.DELETE), ctrlUser.deleteById);

    router.get('/customers', auth, checkPermission(permission.type.READ), ctrlUser.findClient);
    router.post('/customers', auth, checkPermission(permission.type.CREATE), ctrlUser.createClient);

    router.get('/currentInfo', auth, ctrlUser.getCurrentInfo);

}

module.exports = route_user