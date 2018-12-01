const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const algorithm = 'sha1';
const UserInfo = mongoose.model('UserInfo');

let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique : true},
    created_time: {type: Date, default: Date.now},
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, algorithm).toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, algorithm).toString('hex');
  return this.hash === hash;
};

mongoose.model('LoginInfo', userSchema);

