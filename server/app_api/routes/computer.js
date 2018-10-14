const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const checkPermissionForCollection = permission.checkPermissionForCollection;
const ctrComputerName = require('../controller/device/computerNames');
const ctrComputerType = require('../controller/device/computerTypes');


const route_computer = (router) => {
    const checkPermissionForComputerName = checkPermissionForCollection('ComputerName');
    const checkPermissionForComputerType = checkPermissionForCollection('ComputerType');
    router.get(
        '/computerNames',
        auth,
        checkPermissionForComputerName(permission.type.READ),
        ctrComputerName.find
    );

    router.get(
        '/computerNames/:computerNameId'
        ,auth
        ,checkPermissionForComputerName(permission.type.READ
        ,ctrComputerName.findById)
    )
    router.post(
        '/computerNames'
        ,auth
        ,checkPermissionForComputerName(permission.type.CREATE)
        ,ctrComputerName.create
    )

    router.put(
        '/computerNames/:computerNameId'
        ,auth
        ,checkPermissionForComputerName(permission.type.UPDATE)
        ,ctrComputerName.updateById
    )

    router.delete(
        '/computerNames/:computerNameId'
        ,auth
        ,checkPermissionForComputerName(permission.type.DELETE)
        ,ctrComputerName.deleteById
    )

    router.get(
        '/computerTypes'
        ,auth
        ,checkPermissionForComputerType(permission.type.READ)
        ,ctrComputerType.find
    )

    router.get(
        '/computerTypes/:computerTypeId'
        ,auth
        ,checkPermissionForComputerType(permission.type.READ)
        ,ctrComputerType.findById
    )

    router.post(
        '/computerTypes'
        ,auth
        ,checkPermissionForComputerType(permission.type.CREATE)
        ,ctrComputerType.create
    )

    router.put(
        '/computerTypes/:computerTypeId'
        ,auth
        ,checkPermissionForComputerType(permission.type.UPDATE)
        ,ctrComputerType.updateById
    )

    router.delete(
        '/computerTypes/:computerTypeId'
        ,auth
        ,checkPermissionForComputerType(permission.type.DELETE)
        ,ctrComputerType.deleteById
    )
}

module.exports = route_computer