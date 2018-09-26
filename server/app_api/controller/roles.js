const mongoose = require("mongoose");
const Role = mongoose.model('Role');

const find = (req, res) => {
    Role
        .find({})
        .populate('User')
        .exec((err, roles) => {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                res.status(200);
                res.json(roles);
            }
        })
}

module.exports = {
    find
}

