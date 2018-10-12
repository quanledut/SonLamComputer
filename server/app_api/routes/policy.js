
const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrlPolicy = require('../controller/user/policy');

const route_policy = (router) => {
/* Role Api */
	const checkPermissionForRole = checkPermissionForCollection('Policy');
	
	router.get('/policies', auth, checkPermissionForRole(permission.type.READ), ctrlPolicy.find);
	router.get('/policies/:policyId', auth, checkPermissionForRole(permission.type.READ), ctrlPolicy.findById)
	router.post('/policies', auth, checkPermissionForRole(permission.type.CREATE), ctrlPolicy.create)
	router.put('/policies/:policyId', auth, checkPermissionForRole(permission.type.UPDATE), ctrlPolicy.updateById)
	router.delete('/policies/:policyId', auth, checkPermissionForRole(permission.type.DELETE), ctrlPolicy.deleteById)
}

module.exports = route_policy