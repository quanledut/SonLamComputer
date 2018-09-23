const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

const ensurePolicy = (collectionName) => (req, res, next) => {
	next();
}

const ctrlUser = require('../controller/users');

/* GET home page. */
router.post('/users', ctrlUser.register);
router.post('/users/login', ctrlUser.login);
		

module.exports = router;
