const mongoose = require("mongoose");
const { sendJsonResponse } = require ('../utils');

const ServiceType = mongoose.model('ServiceType');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = ServiceType
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
        if (req.query.all) {
            const docs = await ServiceType
                .find({})
                .exec()
                
            sendJsonResponse(res,200,docs);

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
        sendJsonResponse(res, 400, {msg: "Input không hợp lệ",detail: "Invalid input"})
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
        .findOneAndUpdate(
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
        .findOneAndDelete(req.params.serviceTypeId, (err, result) => {
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