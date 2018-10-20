const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const {sendJsonResponse} = require('../utils');

const find = (req,res) => {
    Device
    .find({})
    .populate('computerName')
    .populate('deviceType')
    .populate('serviceType')
    .exec()
    .then((device) => {
        if(device) sendJsonResponse(res,200,device);
        else sendJsonResponse(res,404,'Not foud');
    }
    ,(err) => {
        sendJsonResponse(res,500,err);
    })
};

const findById = (req,res) => {
    Device
    .findById(req.params.deviceId)
    .populate('computerName')
    .populate('deviceType')
    .populate('serviceType')
    .exec()
    .then((deviceType) => {
        if(deviceType) sendJsonResponse(res,200,deviceType)
        else sendJsonResponse(res,400,'Not found');
    })
    .catch(err => sendJsonResponse(res,500,err));
}

const findByName = (req,res) =>{
    Device
    .find({name:req.params.name})
    .exec()
    .then((deviceTypes) =>{
        if(deviceTypes) sendJsonResponse(res,200,deviceTypes);
        else sendJsonResponse(res,404, 'Not found')
    }
    ,(err) => sendJsonResponse(res,500,err)
    )
}

const create = (req,res) => {
    Device.create({
        computerName: req.body.computerName,
        deviceType: req.body.deviceType,
        serviceType: req.body.serviceType,
        description: req.body.description,
        image_url: req.body.image_url,
        amount: req.body.amount,
        price: req.body.price,
        guaranteeDuration: req.body.guaranteeDuration
    }, (err, device) => {
        if(err) sendJsonResponse(res,500,err);
        else sendJsonResponse(res,200,device);
    })
}

// const updateById = (req,res) => {
//     Device
//     .findByIdAndUpdate(
//         req.params.deviceId
//         ,{
//             $set: {
//                 name: req.body.name
//             }
//         }
//         ,{
//             new: true
//         }
//     )
//     ,(err,deviceType) => {
//         if(err) sendJsonResponse(res,500,err);
//         else sendJsonResponse(res,200,deviceType);
//     }
// }

const updateById = (req, res) => {
    Device
        .findByIdAndUpdate(
            req.params.deviceId,
            {
                ...req.body
            }, 
            {
                new: true
            },
            (err, deviceType) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, deviceType);
            }
        )
}

const deleteById = (req, res) => {
    Device
        .findByIdAndRemove(req.params.deviceId, (err, result) => {
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 204, {});
        })
}

module.exports = {
    find,
    findById,
    findByName,
    create,
    updateById,
    deleteById
}