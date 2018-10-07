const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');

const Service = mongoose.model('Service');

const find = (req, res) => {
    Service
        .find({})
        .exec()
        .then((service) => {
            sendJsonResponse(res, 200, service);
        }, (err) => {
            sendJsonResponse(res, 500, err);
        })
}

const findById = (req, res) => {
    Service
        .findById(req.params.serviceId)
        .exec()
        .then((service) => {
            if (!service) sendJsonResponse(res, 404, "Not found");
            else sendJsonResponse(res, 200, service);
        }, (err) => {
            sendJsonResponse(res, 500, err);
        })
}

const create = (req, res) => {
    if (!req.body.customer_name.name || req.body.customer_name.length == 0 ||
        !req.body.customer_id_card || req.body.customer_id_card.length == 0 || 
        req.body.devices.length == 0)  {
            sendJsonResponse(res, 400, "Invalid input")
            return;
    }
    let service = new Service();
    service.customer_name = req.body
    serviceType.save((err, st) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, st);
    })
}

const deleteById = (req, res) => {
    Service
        .findByIdAndRemove(req.params.serviceId, (err, result) => {
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 204, {});
        })
}

module.exports = {
    find,
    findById,
    create,
    deleteById
}