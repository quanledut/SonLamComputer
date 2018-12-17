const jwt = require('express-jwt');

const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const permission = require('../controller/permission');
const ctrlReport = require('../controller/report');
const checkPermissionForCollection = permission.checkPermissionForCollection;


const route_report = (router) => {
    const checkPermissionForService = checkPermissionForCollection('Service');
    const checkPermissionForDevice = checkPermissionForCollection('Device');
    const checkPermissionForAcccessory = checkPermissionForCollection('Accessory');

    //For services
    router.get(
        '/report/line',
        auth,
        checkPermissionForService(permission.type.READ),
        checkPermissionForDevice(permission.type.READ),
        checkPermissionForAcccessory(permission.type.READ),

        ctrlReport.line
    );

    //For services
    router.get(
            '/report/bar',
            auth,
            checkPermissionForService(permission.type.READ),
            checkPermissionForDevice(permission.type.READ),
            checkPermissionForAcccessory(permission.type.READ),
    
            ctrlReport.bar
        );
}

module.exports = route_report;