var mongoose = require('mongoose');
var ComputerName = mongoose.model('ComputerName');
var {sendJsonResponse} = require('../utils');

const find = (req,res) =>{
    ComputerName
    .find({})
    .populate('type')
    .exec((err,computerNames)=>{
        if(err) sendJsonResponse(res,500,err);
        else{
            if(computerNames.length == 0) sendJsonResponse(res,400,'Computer name is Empty');
            else sendJsonResponse(res,200,computerNames);
        }
    });
}

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
    ComputerName
    .findOne({name:req.body.name})
    .exec((err,computerName) => {
        if(computerName){
            sendJsonResponse(res,404,'Computer Name is exist');
            return;
        }
    });
    if(!req.body.name && req.body.name.length == 0){
        sendJsonResponse(res,400,'Invalid Input');
    }
    let newComputerName = new ComputerName();
    newComputerName.name = req.body.name;
    newComputerName.type = req.body.type;
    newComputerName.save((err,cn)=>{
        if(err) sendJsonResponse(res,500,err);
        if(cn) sendJsonResponse(res,200,cn);
    })
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