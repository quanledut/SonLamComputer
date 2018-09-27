const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const checkPermission = require('../controller/permission');

const ctrlUser = require('../controller/users');
const ctrlRole = require('../controller/roles');
/* GET home page. */
router.post('/users', ctrlUser.register);
router.post('/users/login', ctrlUser.login);

/* GET Roles */
router.get('/roles', auth, checkPermission.checkPermissionMiddleWare('Role', checkPermission.type.READ), ctrlRole.find);

module.exports = router;
