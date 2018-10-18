const mongoose = require("mongoose");
const Role = mongoose.model('Role');
const Policy = mongoose.model('Policy');
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
        .findById(req.params.roleId)
        .populate('users')
        .populate('policies')
        .exec((err, role) => {
            if (!role) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, role);
        })
}

const create = async (req, res) => {
    const role = new Role();
    role.name = req.body.name;
    let result;
    try {
        result = await role.save();
        for (let i = 0; i < req.body.policies.length; i++) {
            const policy = req.body.policies[i];

            await Policy.create({
                roleId: result._id,
                collectionName: policy.collectionName,
                isCreate: policy.isCreate,
                isRead: policy.isRead,
                isUpdate: policy.isUpdate,
                isDelete: policy.isDelete                
            })
        }
        console.log("Done")
        sendJsonResponse(res, 201, result);
    } catch (err) {
        console.log(err)
        sendJsonResponse(res, 500, err);
    }
}

const updateById = async (req, res) => {
    // let role;


    // Role
    //     .findById(
    //         req.params.roleId
    //     , (err, role) => {
    //         if (err) sendJsonResponse(res, 500, err);
    //         else {
    //             role.policies = req.body.policies
    //             console.log(role, req.body.polices)
    //             if (role.name != req.body.name) role.name = req.body.name
    //             role.save((err,r) => {
    //                 if (err) sendJsonResponse(res, 500, err);
    //                 else sendJsonResponse(res, 200, r);
    //             })
    //         }
    //     })
}

const deleteById = (req, res) => {
    Role
        .findByIdAndRemove(
            req.params.roleId,
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

