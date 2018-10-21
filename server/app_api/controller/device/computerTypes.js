const mongoose = require('mongoose');
const ComputerType = mongoose.model('ComputerType');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const createAggregate = (stringQuery) => {
    let aggreagte = ComputerType
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
            const device = await ComputerType
                .find({})
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


const findById = (req,res) =>{
    ComputerType
    .findById(req.params.computerTypeId)
    .exec((err,computerType) =>{
        if(err) sendJsonResponse(res,500,err);
        else if(computerType) sendJsonResponse(res,200,computerType);
        else sendJsonResponse(res,404,'Not found');
    })
}

const updateById = (req,res) =>{
    ComputerType
    .findByIdAndUpdate(
        req.params.computerTypeId
        ,{
            name : req.body.name
        }
        ,{
            new: true
        }
    ,(err,computerType) =>{
        if(err) sendJsonResponse(res,500,err)
        else if(!computerType) sendJsonResponse(res,404,'ComputerType not found');
        else sendJsonResponse(res,200,computerType)
        }
    )
}

const create = (req,res) => {
    if(!req.body.name && req.body.name == ''){
        sendJsonResponse(res,500,'Invalid input');
        return;
    }
    ComputerType
    .findOne({name:req.body.name})
    .exec((err,ct)=>{
        if(ct){
            sendJsonResponse(res,500,'Computer Type is exist');
            return;
        }
        else{
            let computerType = new ComputerType();
            computerType.name = req.body.name;
            computerType.save((err,ct) =>{
                if(err) sendJsonResponse(res,500,err);
                else sendJsonResponse(res,200,ct);
            });
        }
    });
}

const deleteById = (req,res) => {
    ComputerType
    .findByIdAndRemove(req.params.computerTypeId,
    (err)=>{
        if(err) sendJsonResponse(res,500,err);
        else sendJsonResponse(res,200,'Deleted!');
    })
}

module.exports = {
    find
    ,findById
    ,create
    ,deleteById
    ,updateById
}