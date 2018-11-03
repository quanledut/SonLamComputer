const mongoose = require('mongoose');
const AccessoryType = mongoose.model('AccessoryType');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = AccessoryType
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
        const {all, ...query} = req.body
        if (all) {
            const accessory = await AccessoryType
                .find({
                    ...query
                })
                .exec()
                
            sendJsonResponse(res,200,{
                docs: accessory,
        
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

const findById = (req,res) => {
    AccessoryType
    .findById(req.params.accessoryTypeId)
    .exec()
    .then((accessoryType) => {
        if(accessoryType) sendJsonResponse(res,200,accessoryType)
        else sendJsonResponse(res,400,'Not found');
    })
    .catch(err => sendJsonResponse(res,500,err));
}

const findByName = (req,res) =>{
    AccessoryType
    .find({name:req.params.name})
    .exec()
    .then((accessoryTypes) =>{
        if(accessoryTypes) sendJsonResponse(res,200,accessoryTypes);
        else sendJsonResponse(res,404, 'Not found')
    }
    ,(err) => sendJsonResponse(res,500,err)
    )
}

const create = (req,res) => {
    if(!req.body.name || req.body.name.lenth == 0){
        sendJsonResponse(res,400,'Invalid Input');
        return;
    }
    AccessoryType
    .findOne({name:req.body.name})
    .exec((err,ct)=>{
        if(ct){
            sendJsonResponse(res,500,'Accessory Type is exist');
            return;
        }
        else{
            let accessoryType = new AccessoryType({name: req.body.name});
            accessoryType.save((err,accessoryType) =>{
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 201, accessoryType);
            })
        }
    });
}

// const updateById = (req,res) => {
//     AccessoryType
//     .findByIdAndUpdate(
//         req.params.accessoryTypeId
//         ,{
//             $set: {
//                 name: req.body.name
//             }
//         }
//         ,{
//             new: true
//         }
//     )
//     ,(err,accessoryType) => {
//         if(err) sendJsonResponse(res,500,err);
//         else sendJsonResponse(res,200,accessoryType);
//     }
// }

const updateById = (req, res) => {
    AccessoryType
        .findByIdAndUpdate(
            req.params.accessoryTypeId,
            {
                    name: req.body.name
            }, 
            {
                new: true
            },
            (err, accessoryType) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, accessoryType);
            }
        )
}

const deleteById = (req, res) => {
    AccessoryType
        .findByIdAndRemove(req.params.accessoryTypeId, (err, result) => {
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