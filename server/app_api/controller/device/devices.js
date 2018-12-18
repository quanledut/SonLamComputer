const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const HistoryDevice = mongoose.model('HistoryInputDevice');
const Service = mongoose.model('Service');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const permission = require('../permission');

const createAggregate = (stringQuery) => {
    let aggreagte = Device
    .aggregate()
    .lookup({
        from: 'devicetypes',
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
                {
                    'name': {
                        $regex: stringQuery, $options:"$i"
                    }
                }
            ]
        })
    }
    return aggreagte
}

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
        let {all, ...query} = req.query
        if (all) {
            const device = await Device
                .find(query)
                .populate('deviceType')
                .exec()

            sendJsonResponse(res,200,{
                docs: device,

            });

            return;
        }



        const {page, pages, limit, skip, total} = await createPaginationQueryByAggregate(createAggregate(req.query.string), req.query)


        const device = await createAggregate(req.query.string)
            .skip(skip)
            .limit(limit)

        sendJsonResponse(res,200,{
            docs: device,
            total,
            pages,
            page,
            limit
        });
    }
    catch (err) {
        console.log(err)
        sendJsonResponse(res,500,{
            msg: "Tìm kiếm thất bại",
            detail: err
        });
    }
};

const findById = (req,res) => {
    Device
    .findById(req.params.deviceId)
    .populate('deviceType')
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
    Device
    .find({name:req.params.name})
    .exec()
    .then((deviceTypes) =>{
        if(deviceTypes) sendJsonResponse(res,200,deviceTypes);
        else sendJsonResponse(res,404, 'Not found')
    }
    ,(err) => sendJsonResponse(res,500,{             msg: "Tìm kiếm thất bại",             detail: err         })
    )
}

const historyImport = (req, res) => {
  HistoryDevice.find({
    device: req.params.deviceId
  }).exec().then((history) => {
    sendJsonResponse(res, 200, history)
  }).catch((err) => sendJsonResponse(res, 200, {}))
}

const historyExport = (req, res) => {
  if (!req.payload || !req.payload.roles) {
    sendJsonResponse(res, 200, {});
  }

  const checkPermissionForService = permission.checkPermissionForCollection('Service');
  if (!checkPermissionForService(permission.type.READ)) {
    sendJsonResponse(res, 200, {});
  }

  Service.find({
    "devices.deviceId": req.params.deviceId
  }).exec().then((services) => {
    const result = services.map((service) => {
      const history = service.devices.reduce((obj, item) => {
        if (item.deviceId == req.params.deviceId) {
          obj.amount++;
          obj.price = item.price
        }
        return obj;
      }, {
        amount: 0,
        price: 0,
      });

      history.createdAt = service.date;
      history.serviceId = service._id;

      return history;
    });

    sendJsonResponse(res, 200, result);

  })
}

const create = async (req,res) => {
    try {
        let prevDevice = await Device
            .findOne({name:req.body.name, type: new mongoose.Types.ObjectId(req.body.type)})
            .exec();

        if (prevDevice) {

            prevDevice.amount = prevDevice.amount + parseInt(req.body.amount);
            prevDevice.price = req.body.price;
            prevDevice.guaranteeDuration = req.body.guaranteeDuration;

            if (req.body.image_url) prevDevice.image_url = req.body.image_url;

            const result = await prevDevice.save();

            await HistoryDevice.create({
                device: result._id,
                amount: req.body.amount,
                price: req.body.inputPrice
            });

            sendJsonResponse(res, 201, result)
        } else {
            const result = await Device.create({
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                image_url: req.body.image_url,
                amount: req.body.amount,
                price: req.body.price,
                guaranteeDuration: req.body.guaranteeDuration
            });

            await HistoryDevice.create({
                device: result._id,
                amount: req.body.amount,
                price: req.body.inputPrice
            });

            sendJsonResponse(res,201,result);
        }
    } catch(err) {
        if(err) sendJsonResponse(res,500, {
            msg: "Nhap hang thất bại",
            detail: err
        });

    }


}

// const updateById = (req,res) => {
//     Device
//     .findByIdAndUpdate(
//         req.params.deviceId
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
    Device
        .findByIdAndUpdate(
            req.params.deviceId,
            {
                ...req.body
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
    Device
        .findByIdAndRemove(req.params.deviceId, (err, result) => {
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
    deleteById,
    historyImport,
    historyExport
}