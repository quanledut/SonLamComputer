
const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrlRole = require('../controller/user/roles');

const route_role = (router) => {
/* Role Api */
	const checkPermissionForRole = checkPermissionForCollection('Role');
	router.get('/roles', auth, checkPermissionForRole(permission.type.READ), ctrlRole.find);
}

module.exports = route_role