const mongoose = require('mongoose');
const DeviceType = mongoose.model('DeviceType');
const {sendJsonResponse} = require('../utils');

const find = (req,res) => {
    DeviceType
    .find({})
    .exec()
    .then((deviceTypes) => {
        if(deviceTypes) sendJsonResponse(res,200,deviceTypes);
        else sendJsonResponse(res,404,'Not foud');
    }
    ,(err) => {
        sendJsonResponse(res,500,err);
    })
};

const findById = (req,res) => {
    DeviceType
    .findById(req.params.deviceTypeId)
    .exec()
    .then((deviceType) => {
        if(deviceType) sendJsonResponse(res,200,deviceType)
        else sendJsonResponse(res,400,'Not found');
    })
    .catch(err => sendJsonResponse(res,500,err));
}

const findByName = (req,res) =>{
    DeviceType
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
    DeviceType.findOne({name: req.body.name})
    .exec()
    .then((deviceTypes =>{
        if(deviceTypes){
            sendJsonResponse(res,500,'Device type is existing!!');
            return;
        }
    }))
    if(!req.body.name || req.body.name.lenth == 0){
        sendJsonResponse(res,400,'Invalid Input');
    }
    let deviceType = new DeviceType({name: req.body.name});
    deviceType.save((err,deviceType) =>{
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, deviceType);
    })
}

// const updateById = (req,res) => {
//     DeviceType
//     .findByIdAndUpdate(
//         req.params.deviceTypeId
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
    DeviceType
        .findByIdAndUpdate(
            req.params.deviceTypeId,
            {
                    name: req.body.name
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
    DeviceType
        .findByIdAndRemove(req.params.deviceTypeId, (err, result) => {
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