const mongoose = require("mongoose");
const Role = mongoose.model('Role');
const {DEFAULT_PERMISSION_NAMES} = require('../../model/user/policy')
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

    for (let i=0; i < req.body.policies.length; i++) {
        let policy = req.body.policies[i];
        role.policies.push({
            collectionName: policy.collectionName,
            isCreate: policy.isCreate,
            isRead: policy.isRead,
            isUpdate: policy.isUpdate,
            isDelete: policy.isDelete
        })
    }

    role.save((err, result) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, result);
    })
}

const updateById = (req, res) => {
    let newPolicies = req.body.policies

    Role
        .findByIdAndUpdate(
            req.param.roleId,
            {
                name: req.body.name,
                polices: newPolicies
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

const getCollectionNames = (req, res) => {
    sendJsonResponse(res, 200, {
        collections: Object.keys(mongoose.connection.models),
        permissions: DEFAULT_PERMISSION_NAMES

    })
}

module.exports = {
    find,
    findById,
    create,
    updateById,
    deleteById,
    getCollectionNames
}

