const mongoose = require('mongoose');
const DeviceType = mongoose.model('DeviceType');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = DeviceType
    .aggregate()


    if (stringQuery) {
        aggreagte = aggreagte.match({
            $or: [
                {
                    'name': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
            ]
        })
    }
    return aggreagte
}

const find = async (req,res) => {
    try {
        const {all, ...query} = req.query
        if (all) {
            const device = await DeviceType
                .find({
                    ...query
                })
                .exec()
                
            sendJsonResponse(res,200,{
                docs: device,
        
            });

            return;
        }

        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)
    
        
        const docs = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

        sendJsonResponse(res,200,{
            docs,
            total,
            pages,
            page,
            limit
        });
    }
    catch (err) {
        console.log(err)
        sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         });
    }
};

const findById = (req,res) => {
    DeviceType
    .findById(req.params.deviceTypeId)
    .exec()
    .then((deviceType) => {
        if(deviceType) sendJsonResponse(res,200,deviceType)
        else sendJsonResponse(res,404, {
            msg: 'Tìm kiếm thất bại',
            detail: 'Not found'
        });
    })
    .catch(err => sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         }));
}

const findByName = (req,res) =>{
    DeviceType
    .find({name:req.params.name})
    .exec()
    .then((deviceTypes) =>{
        if(deviceTypes) sendJsonResponse(res,200,deviceTypes);
        else sendJsonResponse(res,404, {
            msg: 'Tìm kiếm thất bại',
            detail: 'Not found'
        });
    }
    ,(err) => sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         })
    )
}

const create = (req,res) => {
    if(!req.body.name || req.body.name.lenth == 0){
        sendJsonResponse(res,400, {
            msg: "Input không hợp lệ",
            detail: "Invalid Input"
        });
        return;
    }
    DeviceType.findOne({name: req.body.name})
    .exec()
    .then((deviceTypes =>{
        if(deviceTypes){
            sendJsonResponse(res,500, {
                msg: "Loại thiết bị đã tồn tại",
                detail: "DeviceType existed"
            });
            return;
        }

        let deviceType = new DeviceType({name: req.body.name});
        deviceType.save((err,deviceType) =>{
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 201, deviceType);
        })    
    }))
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
//         if(err) sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         });
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