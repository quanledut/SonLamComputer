const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = Device
    .aggregate()
    .lookup({
        from: 'devicetypes',
        localField: 'deviceType',
        foreignField: '_id',
        as: 'deviceType'
    })
    .unwind('$deviceType')

    if (stringQuery) {
        aggreagte = aggreagte.match({
            $or: [
                {
                    'deviceType.name': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'name': {
                        $regex: stringQuery, $options:"$i"
                    }
                }
            ]
        })
    }
    return aggreagte
}

const find = async (req,res) => {
    try {
        // const device = await Device
        //     .find(query, {}, {
        //         skip,
        //         limit
        //     })
        //     .populate('computerName')
        //     .populate('deviceType')
        //     .populate('serviceType')
        //     .exec()
        console.log(req.query)
        if (req.query.all) {
            const device = await Device
                .find({})
                .populate('deviceType')
                .exec()
                
            sendJsonResponse(res,200,{
                docs: device,
        
            });

            return;
        }
        
    
    
        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)
    
        
        const device = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

        sendJsonResponse(res,200,{
            docs: device,
            total,
            pages,
            page,
            limit
        });
    }
    catch (err) {
        console.log(err)
        sendJsonResponse(res,500,err);
    }
};

const findById = (req,res) => {
    Device
    .findById(req.params.deviceId)
    .populate('deviceType')
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
        name: req.body.name,
        type: req.body.deviceType,
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