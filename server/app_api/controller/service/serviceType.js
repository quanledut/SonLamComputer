const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');

const ServiceType = mongoose.model('ServiceType');

const find = (req, res) => {
    ServiceType
        .find({})
        .exec()
        .then((serviceTypes) => {
            sendJsonResponse(res, 200, serviceTypes);
        }, (err) => {
            sendJsonResponse(res, 500, err);
        })
}

const findById = (req, res) => {
    ServiceType
        .findById(req.params.serviceTypeId)
        .exec()
        .then((serviceType) => {
            if (!serviceType) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, serviceType);
        }, (err) => {
            sendJsonResponse(res, 500, err);
        })
}

const create = (req, res) => {
    if (!req.body.name || req.body.name.length == 0)  {
        sendJsonResponse(res, 400, "Invalid input")
        return;
    }
    let serviceType = new ServiceType();
    serviceType.name = req.body.name;
    serviceType.save((err, st) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, st);
    })
}

const updateById = (req, res) => {
    ServiceType
        .findByIdAndUpdate(
            req.params.serviceTypeId,
            {
                $set: {
                    name: req.body.name
                }
            }, 
            {
                new: true
            },
            (err, serviceType) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, serviceType);
            }
        )
}

const deleteById = (req, res) => {
    ServiceType
        .findByIdAndRemove(req.params.serviceTypeId, (err, result) => {
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 204, {});
        })
}

module.exports = {
    find,
    findById,
    create,
    updateById,
    deleteById
}