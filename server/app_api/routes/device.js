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
        checkPermissionForDeviceType(permission.type.READ, true),
        ctrDeviceType.find
    );

    router.get(
        '/deviceTypes/:deviceTypeId',
        checkPermissionForDeviceType(permission.type.READ, true),
        ctrDeviceType.findById
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
        checkPermissionForDevice(permission.type.READ, true),
        ctrlDevice.find
    );

    router.get(
        '/devices/:deviceId',
        checkPermissionForDevice(permission.type.READ, true),
        ctrlDevice.findById
    );

    router.get(
      '/devices/:deviceId/historyImport',
      auth,
      checkPermissionForDevice(permission.type.READ),
      ctrlDevice.historyImport
    );

  router.get(
    '/devices/:deviceId/historyExport',
    auth,
    checkPermissionForDevice(permission.type.READ),
    ctrlDevice.historyExport
  );



    router.post(
        '/devices',
        auth,
        checkPermissionForDevice(permission.type.CREATE),
        ctrlDevice.create
    );

    router.put(
        '/devices/:deviceId',
        auth,
        checkPermissionForDevice(permission.type.UPDATE),
        ctrlDevice.updateById
    );


    router.delete(
        '/devices/:deviceId',
        auth,
        checkPermissionForDevice(permission.type.DELETE),
        ctrlDevice.deleteById
    )

}

module.exports = route_device