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
        '/services',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.find
    )

    router.get(
        '/services/:serviceId',
        auth,
        checkPermissionForService(permission.type.READ),
        ctrlService.findById
    )

    router.post(
        '/services',
        auth,
        checkPermissionForService(permission.type.CREATE),
        ctrlService.create
    )
    
    router.delete(
        '/services/:serviceId',
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