const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrDeviceType = require('../controller/device/deviceTypes')
const ctrlDevice = require('../controller/device/devices')
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

    const checkPermissionForDevice = checkPermissionForCollection('Device');

    router.get(
        '/devices',
        auth,
        checkPermissionForDeviceType(permission.type.READ),
        ctrlDevice.find
    );

    router.get(
        '/devices/:deviceId',
        auth,
        checkPermissionForDeviceType(permission.type.READ),
        ctrlDevice.findById
    );

    router.post(
        '/devices',
        auth,
        checkPermissionForDeviceType(permission.type.CREATE),
        ctrlDevice.create
    );

    router.put(
        '/devices/:deviceId',
        auth,
        checkPermissionForDeviceType(permission.type.UPDATE),
        ctrlDevice.updateById
    );


    router.delete(
        '/devices/:deviceId',
        auth,
        checkPermissionForDeviceType(permission.type.DELETE),
        ctrlDevice.deleteById
    )

}

module.exports = route_device