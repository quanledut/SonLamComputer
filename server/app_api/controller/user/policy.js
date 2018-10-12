const mongoose = require("mongoose");
const Policy = mongoose.model('Policy');

const { sendJsonResponse } = require('../utils');

const find = (req, res) => {
    Policy
        .find({})
        .exec((err, policies) => {
            sendJsonResponse(res, 200, policies);
        })
}

const findById = (req, res) => {
    Policy
        .findById(req.param.policyId)
        .exec((err, policy) => {
            if (!policy) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, policy);
        })
}

const create = (req, res) => {
    if (!req.body.roleId || !req.body.collectionName) {
        sendJsonResponse(res, 400, "Your input is invalid")
        return;
    }

    const policy = new Policy();
    policy.roleId = req.body.roleId
    policy.collectionName = req.body.collectionName
    policy.permission = policy.generatePermission(
        (req.body.isCreate) ? 1 : 0,
        (req.body.isRead) ? 1 : 0,
        (req.body.isUpdate) ? 1 : 0,
        (req.body.isDelete) ? 1 : 0
    )

    policy.save((err, result) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, result);
    })
}

const updateById = (req, res) => {
    if (!req.body.roleId || !req.body.collectionName) {
        sendJsonResponse(res, 400, "Your input is invalid")
        return;
    }

    let permission = policy.generatePermission(
        (req.body.isCreate) ? 1 : 0,
        (req.body.isRead) ? 1 : 0,
        (req.body.isUpdate) ? 1 : 0,
        (req.body.isDelete) ? 1 : 0
    )

    Policy
        .findByIdAndUpdate(
            req.param.policyId,
            {
                collectionName: req.body.collectionName,
                permission: permission,
                roleId: roleId
            },
            {
                new: true
            },
            (err, policy) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, policy);
            }
        )
}

const deleteById = (req, res) => {
    Policy
        .findByIdAndRemove(
            req.param.policyId,
            (err, result) => {
                if (err) sendJsonResponse(res, 500 ,err);
                else sendJsonResponse(res, 204, "Success");
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

