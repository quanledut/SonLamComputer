const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');

const Service = mongoose.model('Service');
const ServiceType = mongoose.model('ServiceType');

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
            else sendJsonResponse(res, 200, service);
        }, (err) => {
            sendJsonResponse(res, 500, {
                msg: "Tìm kiếm thất bại",
                detail: err
            });
        })
}

const create = (req, res) => {
    if (!req.body.serviceType || 
        !req.body.customer || req.body.customer.length == 0 ||
        (req.body.devices.length == 0) && (req.body.accessories == 0))  {
            sendJsonResponse(res, 400, {msg: "Input không hợp lệ",detail: "Invalid input"})
            return;
    }
    let service = new Service();
    service.staff = req.body.staff._id;
    service.serviceType = req.body.serviceType
    service.customer = req.body.customer;
    service.devices = req.body.devices
    service.accessories = req.body.accessories
	service.date = req.body.date
    service.calculatePrice()

    service.save((err, st) => {
        console.log("hi")
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, st);
    })
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
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 201, st);
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
            console.log("hi")
            if (err) sendJsonResponse(res, 500, err);
            else sendJsonResponse(res, 201, st);
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