"use strict";
const mongoose = require("mongoose");
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const algorithm = 'sha1';

let userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique : true},
	email: {type: String, required: true, unique : true},
	fullname: String,
	role: {type: Number, default: 3},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, algorithm).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, algorithm).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    name: this.fullname,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);

