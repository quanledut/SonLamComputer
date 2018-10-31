const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrAccessoryType = require('../controller/device/accessoryTypes')
const ctrlAccessory = require('../controller/device/accessorys')
const route_accessory = (router) => {
    const checkPermissionForAccessoryType = checkPermissionForCollection('AccessoryType');

    router.get(
        '/accessoryTypes',
        auth,
        checkPermissionForAccessoryType(permission.type.READ),
        ctrAccessoryType.find
    );

    router.get(
        '/accessoryTypes/:accessoryTypeId',
        auth,
        checkPermissionForAccessoryType(permission.type.READ),
        ctrAccessoryType.findById
    );

    router.get(
        '/accessoryTypes/:name',
        auth,
        checkPermissionForAccessoryType(permission.type.READ),
        ctrAccessoryType.findByName
    );

    router.post(
        '/accessoryTypes',
        auth,
        checkPermissionForAccessoryType(permission.type.CREATE),
        ctrAccessoryType.create
    );

    router.put(
        '/accessoryTypes/:accessoryTypeId',
        auth,
        checkPermissionForAccessoryType(permission.type.UPDATE),
        ctrAccessoryType.updateById
    );


    router.delete(
        '/accessoryTypes/:accessoryTypeId',
        auth,
        checkPermissionForAccessoryType(permission.type.DELETE),
        ctrAccessoryType.deleteById
    )

    const checkPermissionForAccessory = checkPermissionForCollection('Accessory');

    router.get(
        '/accessorys',
        auth,
        checkPermissionForAccessoryType(permission.type.READ),
        ctrlAccessory.find
    );

    router.get(
        '/accessorys/:accessoryId',
        auth,
        checkPermissionForAccessoryType(permission.type.READ),
        ctrlAccessory.findById
    );

    router.post(
        '/accessorys',
        auth,
        checkPermissionForAccessoryType(permission.type.CREATE),
        ctrlAccessory.create
    );

    router.put(
        '/accessorys/:accessoryId',
        auth,
        checkPermissionForAccessoryType(permission.type.UPDATE),
        ctrlAccessory.updateById
    );


    router.delete(
        '/accessorys/:accessoryId',
        auth,
        checkPermissionForAccessoryType(permission.type.DELETE),
        ctrlAccessory.deleteById
    )

}

module.exports = route_accessory