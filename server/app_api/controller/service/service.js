const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');
const { getPrice } = require('../../model/service/services');

const Service = mongoose.model('Service');
const ServiceType = mongoose.model('ServiceType');
const Device = mongoose.model('Device');
const Accessory = mongoose.model('Accessory');

const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregateForServiceType = (serviceTypeId) => (stringQuery) => {
    let aggreagte = Service
    .aggregate()
    .lookup({
        from: 'userinfos',
        localField: 'customer',
        foreignField: '_id',
        as: 'customer'
    })
    .unwind('$customer')
    .lookup({
        from: 'userinfos',
        localField: 'staff',
        foreignField: '_id',
        as: 'staff'
    })
    .unwind('$staff')

    if (serviceTypeId) {
        aggreagte = aggreagte.match({
            serviceType: serviceTypeId
        })
    }

    if (stringQuery) {
        aggreagte = aggreagte.match({
            $or: [
                {
                    'customer.fullname': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'customer.phone': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'staff.fullname': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'accessories.computerSeries': {
                        $regex: stringQuery, $options:"$i"
                    }
                }
            ]
        })
    }
    return aggreagte
}



// const find = (req, res) => {
//     Service
//         .find({})
//         .exec()
//         .then((service) => {
//             sendJsonResponse(res, 200, service);
//         }, (err) => {
//             sendJsonResponse(res, 500, err);
//         })
// }

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
        if (req.query.all) {
            const device = await Service
                .find({})
                .populate('customer')
                .exec()
                
            sendJsonResponse(res,200,{
                docs: device,
        
            });

            return;
        }

        const createAggregate = createAggregateForServiceType();


        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)
    
        
        let docs = await createAggregate(req.query.string)
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
        sendJsonResponse(res,500,{msg: "Tìm kiếm thất bại",             detail: err         });
    }
};

const findFix = async (req,res) => {
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

        const sellType = await ServiceType.findOne({
            name: "Sữa chữa"
        }).exec();

        const createAggregate = createAggregateForServiceType(sellType._id);


        if (req.query.all) {
            const device = await Service
                .find({})
                .populate('customer')
                .populate('staff')
                .exec()
                
            sendJsonResponse(res,200,{
                docs: device,
        
            });

            return;
        }

        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string,sellType._id), req.query)
    
        
        let docs = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

            docs = docs.map(item => {
                item.formatTotalPrice = getPrice(item.totalPrice);
                return item;
            });    

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
        sendJsonResponse(res,500,{msg: "Tìm kiếm thất bại",             detail: err         });
    }
};

const findSell = async (req,res) => {
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

        const sellType = await ServiceType.findOne({
            name: "Mua Bán"
        }).exec();

        const createAggregate = createAggregateForServiceType(sellType._id);

        if (req.query.all) {
            const device = await Service
                .find({}, sellType._id)
                .populate('customer')
                .populate('staff')
                .exec()
                
            sendJsonResponse(res,200,{
                docs: device,
        
            });

            return;
        }

        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)
    
        
        let docs = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

            docs = docs.map(item => {
                item.formatTotalPrice = getPrice(item.totalPrice);
                return item;
            });    

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
        sendJsonResponse(res,500,{msg: "Tìm kiếm thất bại",             detail: err         });
    }
};

const findById = (req, res) => {
    Service
        .findById(req.params.serviceId)
        .populate('customer')
        .populate('staff')
        .exec()
        .then((service) => {
            if (!service) sendJsonResponse(res, 404, {
                msg: "Tìm kiếm thất bại",
                detail: "Not found"
            });

            else sendJsonResponse(res, 200, service.map(item => {
                item.accessories = item.accessories.map(i => {
                    i.formatPrice = getPrice(i.price);
                    return i;
                });

                item.devices = item.devices.map(i => {
                    i.formatPrice = getPrice(i.price);
                    return i;
                });

                return item;
            }));
        }, (err) => {
            sendJsonResponse(res, 500, {
                msg: "Tìm kiếm thất bại",
                detail: err
            });
        })
}

const create = async (req, res) => {
    if (!req.body.serviceType || 
        !req.body.customer || req.body.customer.length == 0 ||
        (req.body.devices.length == 0) && (req.body.accessories == 0))  {
            sendJsonResponse(res, 400, {msg: "Input không hợp lệ",detail: "Invalid input"})
            return;
    }
    try {
        let service = new Service();
        service.staff = req.body.staff._id;
        service.serviceType = req.body.serviceType
        service.customer = req.body.customer;
        service.devices = req.body.devices
        service.accessories = req.body.accessories
        service.calculatePrice()

        const result = await service.save();

        const decAmountDevice = req.body.devices.map(item => {
            return Device.findByIdAndUpdate(item.deviceId, {
                $inc: {
                    amount: -1
                }
            });
        });

        const decAmountAccessory = req.body.accessories.map(item => {
            return Accessory.findByIdAndUpdate(item.accessoryId, {
                $inc: {
                    amount: -1
                }
            })
        });

        const decAmount = [
            ...decAmountAccessory,
            ...decAmountDevice
        ];

        await Promise.all(decAmount);

        sendJsonResponse(res, 201, result);

    } catch(err) {
        if (err) sendJsonResponse(res, 500, {
            msg: "Tao don hang that bai",
            detail: err
        });

    }
}

const createFix = (req, res) => {
    if (!req.body.customer || req.body.customer.length == 0 ||
        (req.body.devices.length == 0) && (req.body.accessories == 0))  {
            sendJsonResponse(res, 400, {msg: "Input không hợp lệ",detail: "Invalid input"})
            return;
    }

    ServiceType.findOne({
        name: "Sữa chữa"
    }).exec((err, type) => {
        if (err || !type) sendJsonResponse(res, 500, err);
        let service = new Service();
        service.staff = req.body.staff._id;
        service.serviceType = type._id;
        service.customer = req.body.customer;
        service.devices = req.body.devices
        service.accessories = req.body.accessories
        service.calculatePrice()
    
        service.save((err, st) => {
            console.log("hi")

            const decAmountAccessory = req.body.accessories.map(item => {
                return Accessory.findByIdAndUpdate(item.accessoryId, {
                    $inc: {
                        amount: -1
                    }
                })
            });

            if (err) sendJsonResponse(res, 500, {
                msg: "Khong the tao don hang",
                detail: err,
            });

            Promise.all(decAmountAccessory).then((r) => {
                sendJsonResponse(res, 201, st);
            }).catch(err => {
                sendJsonResponse(res, 500, {
                    msg: "Khong the tao don hang",
                    detail: err,
                });
            });        
        })
    })
}

const createSell= (req, res) => {
    if (!req.body.customer || req.body.customer.length == 0 ||
        (req.body.devices.length == 0) && (req.body.accessories == 0))  {
            sendJsonResponse(res, 400, {msg: "Input không hợp lệ",detail: "Invalid input"})
            return;
    }

    ServiceType.findOne({
        name: "Mua Bán"
    }).exec((err, type) => {
        if (err || !type) sendJsonResponse(res, 500, err);
        let service = new Service();
        service.serviceType = type._id;
        service.staff = req.body.staff._id;
        service.customer = req.body.customer;
        service.devices = req.body.devices
        service.accessories = req.body.accessories
        service.calculatePrice()
    
        service.save((err, st) => {

            const decAmountDevice = req.body.devices.map(item => {
                return Device.findByIdAndUpdate(item.deviceId, {
                    $inc: {
                        amount: -1
                    }
                });
            });

            if (err) sendJsonResponse(res, 500, {
                msg: "Khong the tao don hang",
                detail: err,
            });

            Promise.all(decAmountDevice).then((r) => {
                sendJsonResponse(res, 201, st);
            }).catch(err => {
                sendJsonResponse(res, 500, {
                    msg: "Khong the tao don hang",
                    detail: err,
                });
            });

        })
    })
}

const deleteById = (req, res) => {
    Service
        .findOneAndDelete(req.params.serviceId, (err, result) => {
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 204, {});
        })
}

module.exports = {
    find,
    findSell,
    findFix,
    findById,
    create,
    createSell,
    createFix,
    deleteById
}