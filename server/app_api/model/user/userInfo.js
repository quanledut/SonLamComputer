const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique : true},
  fullname: String,
  address: String,
  phone: String,
  gender: {type: String, default: "khac"},
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  code: { type: String },
  loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'LoginInfo'},
  created_time: {type: Date, default: Date.now},
});

userSchema.index({ fullname: 1, phone: 1 }, { unique: true })


userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    fullname: this.fullname,
    roles: this.roles,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('UserInfo', userSchema);

