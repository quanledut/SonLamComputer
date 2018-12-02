"use strict";
const mongoose = require("mongoose");
const passport = require("passport");
const UserInfo = mongoose.model("UserInfo");
const LoginInfo = mongoose.model("LoginInfo")
const Role = mongoose.model("Role");
const Service = mongoose.model("Service");

const { sendJsonResponse } = require ('../utils');

const register = async (req, res)=> {
	if (!req.body.username || !req.body.password || !req.body.email) {
		res.status(400).json("Username, password, email are required");
		return;
	} 

	try {
		let loginInfo = new LoginInfo();
		loginInfo.username = req.body.username;
		loginInfo.setPassword(req.body.password);
	
		const loginInfoResult = await loginInfo.save();

		let userRole = await Role.find({
			name: "user"
		}).exec();

		let user = new UserInfo();
		
		user.email = req.body.email;
		user.fullname = req.body.fullname;
		user.address = req.body.address;
		user.phone = req.body.phone;
		user.roles = [userRole._id];
		user.gender = req.body.gender;
		user.loginInfo = loginInfoResult._id;

		await user.save();

		let token = user.generateJwt();
		
		sendJsonResponse(res, 201, {
			"token": token
		});

	} catch(err) {
		sendJsonResponse(res, 400, {
			msg: "Đăng ký thất bại",
			detail: err
		});
	}
}

const createUser = async (req, res) => {
	if (!req.body.username || !req.body.password || !req.body.email) {
		sendJsonResponse(res, 400, {
			msg: "Input không hợp lệ",
			detail: "Input is invalid"
		})
		return;
	} 

	try {
		let loginInfo = new LoginInfo();
		loginInfo.username = req.body.username;
		loginInfo.setPassword(req.body.password);
	
		const loginInfoResult = await loginInfo.save();

		let user = new UserInfo();
		
		user.email = req.body.email;
		user.fullname = req.body.fullname;
		user.address = req.body.address;
		user.phone = req.body.phone;
		user.roles = req.body.roles;
		user.gender = req.body.gender;
		user.loginInfo = loginInfoResult._id;

		const result = await user.save();
		
		sendJsonResponse(res, 201, result);

	} catch(err) {
		sendJsonResponse(res, 400, {
			msg: "Đăng ký thất bại",
			detail: err
		});
	}

}

const login = (req, res)=> {
	if (!req.body.username || !req.body.password) {
		sendJsonResponse(res, 400, {
			msg: "Đăng nhập thất thại",
			detail: "All fields required"
		});
		return;
	}

	passport.authenticate('local', {session: false}, (err, user, info)=> {
		let token;
		if (err) {
			sendJsonResponse(res, 404, {
				msg: "Đăng nhập thất bại",
				detail: err
			});
			return;
		}

		if (user) {
			token = user.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		} else {
			sendJsonResponse(res, 401, {
				msg: "Đăng nhập thất bại",
				detail: info
			})
		}
	})(req, res);
}

const changePassword = async (req, res) => {
	console.log("In change password");
	if (!req.body.oldPassword) {
		sendJsonResponse(res, 400, {
			msg: "Đổi mật khẩu thất bại",
			detail: "Old password is Required"
		})
	} else if (!req.body.newPassword) {
		sendJsonResponse(res, 400, {
			msg: "Đổi mật khẩu thất bại", 
			detail: "New password is required"
		})
	} else if (!req.body.confirmPassword) {
		sendJsonResponse(res, 400, {
			msg: "Đổi mật khẩu thất bại",
			detail: "Please confirm password"
		})
	} else if (req.body.newPassword != req.body.confirmPassword) {
		sendJsonResponse(res, 400, {
			msg: "Đổi mật khẩu thất bại",
			detail: "Passwords do not match"
		})
	} else {
		const currentUser = req.body.payload
		console.log(req.body)

		UserInfo.findById(req.body._id)
			.populate('loginInfo')
			.exec((err, user) => {
				if (!user.loginInfo.validPassword(req.body.oldPassword)) {
					sendJsonResponse(res, 400, {
						msg: "Mật khẩu cũ không chính xác",
						detail: "Old password is not valid"
					})
				} else if (err) {
					sendJsonResponse(res, 404, {
						msg: "Đổi mật khẩu thất bại",
						detail: err
					})
				} else {
					user.loginInfo.setPassword(req.body.newPassword)
					user.loginInfo.save((err) => {
						let token;
						if (err) {
							sendJsonResponse(res, 400, {
								msg: "Đổi mật khẩu thất bại",
								detail: err
							});
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
    UserInfo
		.find({})
		.populate('loginInfo', 'username') 
		.populate('roles', 'name')
        .exec((err, users) => {
			if (users) sendJsonResponse(res, 200, users);
			else  sendJsonResponse(res, 404, {
				msg: "Tìm kiếm thất bại",
				detail: err
			})
        })
}

const findById = (req, res) => {
    UserInfo
		.findById(req.params.userId)
		.populate('loginInfo', 'username')
        .exec((err, user) => {
            if (!user) sendJsonResponse(res, 404, {
				msg: "Tìm kiếm thất bại",
				detail: "Not found"
			})
			else if (err) sendJsonResponse(res, 404, {
				msg: "Tìm kiếm thất bại",
				detail: err
			})
            else sendJsonResponse(res, 200, user);
        })
}

const updateById = (req, res) => {

	if (!req.body.email) {
		res.status(400).json({
			msg: "Input không hợp lệ",
			detail: "Username, email are required"
		});
		return;
	} else {
		UserInfo.findById(req.params.userId, (err, currentUser) => {
			if (err) sendJsonResponse(res, 500, {
				msg: "Cập nhật thất bại",
				detail: "Not found"
			});
			else {
				const newUser = req.body
				for (let key in newUser) {
					if (newUser.hasOwnProperty(key)) {
						currentUser[key] = newUser[key]
					}
				}

				currentUser.save((err, user) => {
					if (err) sendJsonResponse(res, 500, {
						msg: "Cập nhật thất bại",
						detail: "Not found"
					});
					else sendJsonResponse(res, 200, user);
	
				})
			}

		})
		// User
        // .findOneAndUpdate(
        //     req.params.userId,
        //     {
		// 		username: req.body.username,
		// 		email: req.body.email,
		// 		fullname: req.body.fullname,
		// 		phone: req.body.phone,
		// 		roles: req.body.roles,
        //     },
        //     {
		// 		new: true,
		// 		useFindAndModify: false
		// 	},
        //     function(err, user) {
		// 		console.log(err, user)
        //         if (err) sendJsonResponse(res, 500, err);
        //         else sendJsonResponse(res, 200, user);
        //     }
        // )
	}

}

const createClient = async (req, res) => {
	let user = new UserInfo();

	let userRole = await Role.findOne({
		name: "user"
	}).exec();

	const count = await UserInfo.count({
		roles: userRole._id
	}).exec();

	user.email = req.body.email;
	user.fullname = req.body.fullname;
	user.address = req.body.address;
	user.phone = req.body.phone;
	user.roles = [userRole._id];
	user.gender = req.body.gender;
	user.code = `KH ${count + 1}`;


	user.save((err)=> {
		let token;
		if (err) {
			sendJsonResponse(res, 400, {
				msg: "Tạo khách hàng thất bại",
				detail: err
			});
		} else {
			sendJsonResponse(res, 201, user);
		}
	});		
}

const findClient = async (req, res) => {
	try {
		const userRole = await Role.findOne({
			name: "user"
		}).exec();
	
		const users = await UserInfo.find({
			roles: userRole._id
		}).exec();	

		const findServices = users.map(async (user, id) => {
			return {
				user,
				services: await Service.find({
					customer: mongoose.Types.ObjectId(user.id)
				}).exec(),
			}
		});

		const result = await Promise.all(findServices);


		sendJsonResponse(res, 201, result);
	} catch (err) {
		sendJsonResponse(res, 400, {
			msg: "Tạo khách hàng thất bại",
			detail: err
		});
	}
}


module.exports = {
	register,
	createUser,
	login,
	find,
	findById,
	changePassword,
	updateById,
	createClient,
	findClient

}