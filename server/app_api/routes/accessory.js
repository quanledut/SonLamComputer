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
        ctrAccessoryType.find
    );

    router.get(
        '/accessoryTypes/:accessoryTypeId',
        auth,
        ctrAccessoryType.findById
    );

    router.get(
        '/accessoryTypes/:name',
        auth,
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
        ctrlAccessory.find
    );

    router.get(
        '/accessorys/:accessoryId',
        auth,
        ctrlAccessory.findById
    );

    router.post(
        '/accessorys',
        auth,
        checkPermissionForAccessory(permission.type.CREATE),
        ctrlAccessory.create
    );

    router.put(
        '/accessorys/:accessoryId',
        auth,
        checkPermissionForAccessory(permission.type.UPDATE),
        ctrlAccessory.updateById
    );


    router.delete(
        '/accessorys/:accessoryId',
        auth,
        checkPermissionForAccessory(permission.type.DELETE),
        ctrlAccessory.deleteById
    )
}

module.exports = route_accessory