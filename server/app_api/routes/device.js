const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrDeviceType = require('../controller/device/deviceTypes')

const route_device = (router) => {
    const checkPermissionForDeviceType = checkPermissionForCollection('DeviceType');

    router.get(
        '/deviceTypes',
        auth,
        checkPermissionForDeviceType(permission.type.READ),
        ctrDeviceType.find
    );

    router.get(
        '/deviceTypes/:deviceTypeId',
        auth,
        checkPermissionForDeviceType(permission.type.READ),
        ctrDeviceType.findById
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
        '/deviceTypes/:deviceTypeId',
        auth,
        checkPermissionForDeviceType(permission.type.UPDATE),
        ctrDeviceType.updateById
    );


    router.delete(
        '/deviceTypes/:deviceTypeId',
        auth,
        checkPermissionForDeviceType(permission.type.DELETE),
        ctrDeviceType.deleteById
    )
}

module.exports = route_device