"use strict";
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");

const { sendJsonResponse } = require ('../utils');

const register = (req, res)=> {
	if (!req.body.username || !req.body.password || !req.body.email) {
		res.status(400).json("Username, password, email and fullname are required");
		return;
	} 

	let user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.fullname = req.body.fullname;
	user.setPassword(req.body.password);
	user.save((err)=> {
		let token;

		if (err) {
			sendJsonResponse(res, 400, err);
		} else {
			token = user.generateJwt();
			sendJsonResponse(res, 201, {
				"token": token
			});
		}
	});
}

const login = (req, res)=> {
	if (!req.body.username || !req.body.password) {
		sendJsonResponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	passport.authenticate('local', {session: false}, (err, user, info)=> {
		let token;
		if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		} else {
			sendJsonResponse(res, 401, info)
		}
	})(req, res);
}

module.exports = {
	register,
	login
}