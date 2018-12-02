const mongoose = require('mongoose');
const Accessory = mongoose.model('Accessory');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = Accessory
    .aggregate()
    .lookup({
        from: 'accessorytypes',
        localField: 'type',
        foreignField: '_id',
        as: 'type'
    })
    .unwind('$type')


    if (stringQuery) {
        aggreagte = aggreagte.match({
            $or: [
                {
                    'type.name': {
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
        // const accessory = await Accessory
        //     .find(query, {}, {
        //         skip,
        //         limit
        //     })
        //     .populate('computerName')
        //     .populate('accessoryType')
        //     .populate('serviceType')
        //     .exec()
        let {all, ...query} = req.query
        if (query.type) query.type = mongoose.Types.ObjectId(query.type)
        if (all) {
            const accessory = await Accessory
                .find({
                    ...query
                })
                .populate('type')
                .exec()
                
            sendJsonResponse(res,200,{
                docs: accessory,
        
            });

            return;
        }
        
    
    
        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)
    
        
        const accessory = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

        sendJsonResponse(res,200,{
            docs: accessory,
            total,
            pages,
            page,
            limit
        });
    }
    catch (err) {
        console.log(err)
        sendJsonResponse(res,500, {
            msg: "Tìm kiếm thất bại",
            detail: err
        });
    }
};

const findById = (req,res) => {
    Accessory
    .findById(req.params.accessoryId)
    .populate('accessoryType')
    .populate('serviceType')
    .exec()
    .then((accessoryType) => {
        if(accessoryType) sendJsonResponse(res,200,accessoryType)
        else sendJsonResponse(res,404, {
            msg: 'Tìm kiếm thất bại',
            detail: 'Not found'
        });
    })
    .catch(err => sendJsonResponse(res,500, {
        msg: 'Tìm kiếm thất bại',
        detail: err
    }));
}

const findByName = (req,res) =>{
    Accessory
    .find({name:req.params.name})
    .exec()
    .then((accessoryTypes) =>{
        if(accessoryTypes) sendJsonResponse(res,200,accessoryTypes);
        else sendJsonResponse(res,404, {
            msg: 'Tìm kiếm thất bại',
            detail: 'Not found'
        })
    }
    ,(err) => sendJsonResponse(res,500, {
        msg: 'Tìm kiếm thất bại',
        detail: err
    })
    )
}

const create = (req,res) => {
    Accessory
    .findOne({type: req.body.type})
    .exec((err,ct)=>{
        if(ct){
            sendJsonResponse(res,500, {
                msg: 'Linh kiện đã tồn tại',
                detail: 'Accessory is existed'
            });
            return;
        }
        else{
            Accessory.create({
                type: req.body.type,
                description: req.body.description,
                image_url: req.body.image_url,
                amount: req.body.amount,
                price: req.body.price,
                guaranteeDuration: req.body.guaranteeDuration
            }, (err, accessory) => {
                if(err) sendJsonResponse(res,500, {
                    msg: "Tạo mới thất bại",
                    detail: err
                });
                else sendJsonResponse(res,200,accessory);
            })
        }
    });
}

// const updateById = (req,res) => {
//     Accessory
//     .findByIdAndUpdate(
//         req.params.accessoryId
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
//         if(err) sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         });
//         else sendJsonResponse(res,200,accessoryType);
//     }
// }

const updateById = (req, res) => {
    Accessory
        .findByIdAndUpdate(
            req.params.accessoryId,
            {
                ...req.body
            }, 
            {
                new: true
            },
            (err, accessoryType) => {
                if (err) sendJsonResponse(res, 500, {
                    msg: "Cập nhật thất bại",
                    detail: err
                });
                else sendJsonResponse(res, 200, accessoryType);
            }
        )
}

const deleteById = (req, res) => {
    Accessory
        .findByIdAndRemove(req.params.accessoryId, (err, result) => {
            if (err) sendJsonResponse(res, 500, {
                msg: "Xóa thất bại",
                detail: err
            });
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