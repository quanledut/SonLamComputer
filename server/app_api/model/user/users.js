const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const algorithm = 'sha1';

let userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique : true},
	email: {type: String, required: true, unique : true},
  fullname: String,
  address: String,
  phone: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
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

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  console.log(this);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    name: this.fullname,
    roles: this.roles,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);

