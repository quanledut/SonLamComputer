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
const ctrDeviceType = require('../controller/device/deviceTypes');

const checkPermissionForCollection = permission.checkPermissionForCollection;

/* User Api */
router.post('/users', ctrlUser.register);
router.post('/users/login', ctrlUser.login);

/* Role Api */
const checkPermissionForRole = checkPermissionForCollection('Role');
router.get('/roles', auth, checkPermissionForRole(permission.type.READ), ctrlRole.find);

/* ServiceType Api */
const checkPermissionForServiceType = checkPermissionForCollection('ServiceType');

const checkPermissionForDeviceType = checkPermissionForCollection('DeviceType');
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

router.get(
	'/deviceTypes',
	auth,
	checkPermissionForDeviceType(permission.type.READ),
	ctrDeviceType.find
);

router.get(
	'/deviceTypes/:deviceTypeID',
	auth,
	checkPermissionForDeviceType(permission.type.READ),
	ctrDeviceType.findByID
);

router.get(
	'/deviceTypes/:name',
	auth,
	checkPermissionForDeviceType(permission.type.READ),
	ctrDeviceType.findByName
);

router.post(
	'/deviceTypes',
	auth,
	checkPermissionForDeviceType(permission.type.CREATE),
	ctrDeviceType.create
);

router.put(
	'/deviceTypes/:deviceTypeID',
	auth,
	checkPermissionForDeviceType(permission.type.READ),
	ctrDeviceType.updateByID
);

router.delele(
	'/deviceTypes/:deviceTypeID',
	auth,
	checkPermissionForDeviceType(permission.type.DELETE),
	ctrDeviceType.deleteByID
)

module.exports = router;
