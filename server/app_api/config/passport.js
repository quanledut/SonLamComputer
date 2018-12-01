const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var LoginInfo = mongoose.model('LoginInfo');

passport.use(new LocalStrategy(function(username, password, done) {
	LoginInfo.findOne({username: username})
		.exec(function (err, loginResult) {
		if(err) {
			return done(err);
		}

		if (!loginResult) {
			return done(null, false, {
				message: "Incorrect username."
			});
		}

		if (!loginResult.validPassword(password)) {
			return done(null, false, {
				message: "Incorrect password."
			});
		}

		UserInfo.findOne({
			loginInfo: loginResult._id
		}).populate('roles', 'name').exec((err, user) => {
			if(err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, {
					message: "Try again later."
				});
			}
	

			return done(null, user);
		})

		
	})
}))