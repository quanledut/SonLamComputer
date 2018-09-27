const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');

const ctrlUser = require('../controller/user/users');
const ctrlRole = require('../controller/user/roles');
const ctrlServiceType = require('../controller/service/serviceType');

const checkPermissionForCollection = permission.checkPermissionForCollection;

/* User Api */
router.post('/users', ctrlUser.register);
router.post('/users/login', ctrlUser.login);

/* Role Api */
const checkPermissionForRole = checkPermissionForCollection('Role');
router.get('/roles', auth, checkPermissionForRole(permission.type.READ), ctrlRole.find);

/* ServiceType Api */
const checkPermissionForServiceType = checkPermissionForCollection('ServiceType');

router.get(
	'/serviceTypes', 
	auth,
	checkPermissionForServiceType(permission.type.READ),
	ctrlServiceType.find
);

router.get(
	'/serviceTypes/:serviceTypeId',
	auth,
	checkPermissionForServiceType(permission.type.READ),
	ctrlServiceType.findById
)

router.post(
	'/serviceTypes',
	auth,
	checkPermissionForServiceType(permission.type.CREATE),
	ctrlServiceType.create
)

router.put(
	'/serviceTypes/:serviceTypeId',
	auth,
	checkPermissionForServiceType(permission.type.UPDATE),
	ctrlServiceType.updateById
)

router.delete(
	'/serviceTypes/:serviceTypeId',
	auth,
	checkPermissionForServiceType(permission.type.DELETE),
	ctrlServiceType.deleteById
);


module.exports = router;
