
const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;

const ctrlUser = require('../controller/user/users');

const route_user = (router) => {
    const checkPermission = checkPermissionForCollection("User")
    /* User Api */
    router.post('/users/register', ctrlUser.register);
    router.post('/users/login', ctrlUser.login);

    router.get('/users', auth, checkPermission(permission.type.READ), ctrlUser.find)
    router.get('/users/:userId', auth, ctrlUser.findById)
    router.put('/users/:userId/changePassword', auth, ctrlUser.changePassword)
    router.put('/users/:userId', auth, ctrlUser.updateById)
}

module.exports = route_user