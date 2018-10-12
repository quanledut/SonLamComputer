"use strict";
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const Role = mongoose.model("Role");

const { sendJsonResponse } = require ('../utils');

const register = (req, res)=> {
	if (!req.body.username || !req.body.password || !req.body.email) {
		res.status(400).json("Username, password, email are required");
		return;
	} 

	Role.find({
		"name": "user"
	}).exec((err, role) => {
		if (err) {
			sendJsonResponse(res, 500, "Please try again later")
		} else {
			let user = new User();
			user.username = req.body.username;
			user.email = req.body.email;
			user.fullname = req.body.fullname;
			user.address = req.body.address;
			user.phone = req.body.phone;
			user.roles = [role._id];
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
	})
}

const createUser = (req, res) => {
	if (!req.body.username || !req.body.password || !req.body.email) {
		res.status(400).json("Username, password, email are required");
		return;
	} 

	let user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.fullname = req.body.fullname;
	user.address = req.body.address;
	user.phone = req.body.phone;
	user.roles = req.body.roles;
	user.setPassword(req.body.password)

	user.save((err) => {
		if (err) {
			sendJsonResponse(res, 400, err) 
		} else {
			sendJsonResponse(res, 201, "Success")
		}
	})
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

const changePassword = (req, res) => {
	if (!req.body.oldPassword) {
		sendJsonResponse(res, 400, "Old password is Required")
	} else if (!req.body.newPassword) {
		sendJsonResponse(res, 400, "New password is required")
	} else if (!req.body.confirmPassword) {
		sendJsonResponse(res, 400, "Please confirm password")
	} else if (req.body.newPassword != req.body.confirmPassword) {
		sendJsonResponse(res, 400, "Passwords do not match")
	} else {
		const currentUser = req.body.payload
		User.findById(currentUser._id)
			.exec((err, user) => {
				if (!user.validPassword(req.body.oldPassword)) {
					sendJsonResponse(res, 400, "Old password is not valid")
				} else {
					user.setPassword(req.body.newPassword)
					user.save((err) => {
						let token;
						if (err) {
							sendJsonResponse(res, 400, err);
						} else {
							token = user.generateJwt();
							sendJsonResponse(res, 200, {
								"token": token
							});
						}
					})
				}
			})
	}
}

const find = (req, res) => {
    User
        .find({})
        .exec((err, users) => {
            sendJsonResponse(res, 200, users);
        })
}

const findById = (req, res) => {
    User
        .findById(req.param.userId)
        .exec((err, user) => {
            if (!user) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, user);
        })
}

const updateById = (req, res) => {
	if (!req.body.username || !req.body.email) {
		res.status(400).json("Username, email are required");
		return;
	} else {
		Role
        .findByIdAndUpdate(
            req.param.roleId,
            {
				username: req.body.username,
				email: req.body.email,
				fullname: req.body.fullname,
				phone: req.body.phone
            },
            {
                new: true
            },
            (err, role) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, role);
            }
        )
	}

}



module.exports = {
	register,
	createUser,

	login,

	find,
	findById,
	changePassword,
	updateById	
}