const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const ctrlServiceType = require('../controller/service/serviceType');
const ctrlService = require('../controller/service/service');

const checkPermissionForCollection = permission.checkPermissionForCollection;


const route_service = (router) => {
    const checkPermissionForServiceType = checkPermissionForCollection('ServiceType');
    const checkPermissionForService = checkPermissionForCollection('Service');

    //For services
    router.get(
        '/serviceFix',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.findFix
    )

    router.get(
        '/serviceFix/:serviceId',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.findById
    )

    router.post(
        '/serviceFix',
        auth,
        checkPermissionForService(permission.type.CREATE),
        ctrlService.createFix
    )
    
    router.delete(
        '/serviceFix/:serviceId',
        auth,
        checkPermissionForService(permission.type.DELETE),
        ctrlService.deleteById
    )

    router.get(
        '/serviceSell',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.findSell
    )

    router.get(
        '/serviceSell/:serviceId',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.findById
    )

    router.post(
        '/serviceSell',
        auth,
        checkPermissionForService(permission.type.CREATE),
        ctrlService.createSell
    )
    
    router.delete(
        '/serviceSell/:serviceId',
        auth,
        checkPermissionForService(permission.type.DELETE),
        ctrlService.deleteById
    )



    //For serviceTypes
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
    )
}

module.exports = route_service;