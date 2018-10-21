const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');

const Service = mongoose.model('Service');

const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = Service
    .aggregate()
    .lookup({
        from: 'servicetypes',
        localField: 'serviceType',
        foreignField: '_id',
        as: 'serviceType'
    })
    .unwind('$serviceType')

    if (stringQuery) {
        aggreagte = aggreagte.match({
            $or: [
                {
                    'serviceType.name': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'customer_name': {
                        $regex: stringQuery, $options:"$i"
                    }
                },
                {
                    'customer_id_card': {
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
                .populate('serviceType')
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
        sendJsonResponse(res,500,err);
    }
};


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
    if (!req.body.serviceType || 
        !req.body.customer_name || req.body.customer_name.length == 0 ||
        !req.body.customer_id_card || req.body.customer_id_card.length == 0 || 
        req.body.devices.length == 0)  {
            sendJsonResponse(res, 400, "Invalid input")
            return;
    }
    let service = new Service();
    service.serviceType = req.body.serviceType
    service.customer_name = req.body.customer_name;
    service.customer_id_card = req.body.customer_id_card,
    service.devices = req.body.devices,
	service.customer = req.body.customer,
	service.date = req.body.date,
    service.calculatePrice()

    service.save((err, st) => {
        if (err) sendJsonResponse(res, 500, err);
        else sendJsonResponse(res, 201, st);
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
    findById,
    create,
    deleteById
}