
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
	
	router.get('/roles/collectionNames', auth, checkPermissionForRole(permission.type.READ), ctrlRole.getCollectionNames)
	router.get('/roles', auth, checkPermissionForRole(permission.type.READ), ctrlRole.find);
	router.get('/roles/:roleId', auth, checkPermissionForRole(permission.type.READ), ctrlRole.findById)
	router.post('/roles', auth, checkPermissionForRole(permission.type.CREATE), ctrlRole.create)
	router.put('/roles/:roleId', auth, checkPermissionForRole(permission.type.UPDATE), ctrlRole.updateById)
	router.delete('/roles/:roleId', auth, checkPermissionForRole(permission.type.DELETE), ctrlRole.deleteById)
}

module.exports = route_role