const mongoose = require("mongoose");
const Role = mongoose.model('Role');

const { sendJsonResponse } = require('../utils');

const find = (req, res) => {
    Role
        .find({})
        .exec((err, roles) => {
            sendJsonResponse(res, 200, roles);
        })
}

const findById = (req, res) => {
    Role
        .findById(req.param.roleId)
        .populate('users')
        .exec((err, role) => {
            if (!role) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, role);
        })
}

const create = (req, res) => {
    const role = new Role();
    role.name = req.body.name;
    role.save((err, result) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, result);
    })
}

const updateById = (req, res) => {
    Role
        .findByIdAndUpdate(
            req.param.roleId,
            {
                name: req.body.name
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

const deleteById = (req, res) => {
    Role
        .findByIdAndRemove(
            req.param.roleId,
            (err, result) => {
                if (err) sendJsonResponse(res, 500 ,err);
                else sendJsonResponse(res, 204, {});
            }
        )
}

module.exports = {
    find,
    findById,
    create,
    updateById,
    deleteById
}

