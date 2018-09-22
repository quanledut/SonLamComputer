const express = require('express');
const router = express.Router();
const passport = require('passport')
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

const ctrlUser = require('../controller/users');

/* GET home page. */
router.post('/users', ctrlUser.register);
router.post('/users/login', ctrlUser.login);
		

module.exports = router;
