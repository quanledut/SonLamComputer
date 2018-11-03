var mongoose = require('mongoose');
var ComputerName = mongoose.model('ComputerName');
var {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = ComputerName
    .aggregate()
    .lookup({
        from: 'computertypes',
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
        if (req.query.all) {
            const device = await ComputerName
                .find({})
                .populate('type')
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


const findById = (req,res) => {
    ComputerName
    .findById(req.params.computerNameId)
    .populate('type')
    .exec((err,computerName)=>{
        if(err) sendJsonResponse(res,500,err);
        else if(computerName) sendJsonResponse(res,200,computerName);
        else sendJsonResponse(res,404,'Not found');
    });
}

const create = (req,res) => {
    if(!req.body.name && req.body.name.length == 0){
        sendJsonResponse(res,400,'Invalid Input');
        return;
    }
    ComputerName
    .findOne({name:req.body.name, type: req.body.type})
    .exec((err,computerName) => {
        if(computerName){
            sendJsonResponse(res,500,'Computer Name is exist');
            return;
        }

        let newComputerName = new ComputerName();
        newComputerName.name = req.body.name;
        newComputerName.type = req.body.type;
        newComputerName.save((err,cn)=>{
            if(err) sendJsonResponse(res,500,err);
            if(cn) sendJsonResponse(res,200,cn);
        })
    
    });
}

const updateById = (req, res) => {
    ComputerName
        .findByIdAndUpdate(
            req.params.computerNameId,
            {
                $set: {
                    name: req.body.name,
		    type: req.body.type
                }
            }, 
            {
                new: true
            },
            (err, computerName) => {
                if (err) sendJsonResponse(res, 500, err);
                else sendJsonResponse(res, 200, computerName);
            }
        )
}

const deleteById = (req,res) =>{
    ComputerName
    .findByIdAndRemove(req.params.computerNameId
    ,(err, computerName) => {
        if(err) sendJsonResponse(res,500,err);
        if(computerName) sendJsonResponse(res,200,'Deleted');
    })
}

module.exports = {
    find
    ,findById
    ,create
    ,updateById
    ,deleteById
}