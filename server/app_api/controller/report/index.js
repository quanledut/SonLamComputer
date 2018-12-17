const mongoose = require('mongoose');
const HistoryDevice = mongoose.model('HistoryInputDevice');
const HistoryAccessory = mongoose.model('HistoryInputAccessory');

const Service = mongoose.model('Service');
const ServiceType = mongoose.model('ServiceType');

const _ = require('lodash');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const line = async (req, res) => {
    try {
        const inputDeviceHistory = HistoryDevice.aggregate([
            {
                $project: {
                    money: {
                        $multiply: ['$amount', '$price']
                    },
                    createdAt: '$createdAt',
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    money: { 
                        $sum: '$money'
                    }
                }
            }
        ])

        const inputAccessoryHistory = HistoryAccessory.aggregate([
            {
                $project: {
                    money: {
                        $multiply: ['$amount', '$price']
                    },
                    createdAt: '$createdAt',
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    money: { 
                        $sum: '$money'
                    }
                }
            }
        ]);

        const serviceFixHistory = Service.aggregate([
            {
                $lookup: {
                    from: 'servicetypes',
                    localField: 'type',
                    foreignField: '_id',
                    as: 'type'            
                }
            }, 
            { $unwind: '$type' },
            {
                $match: {
                    'type.name': 'Sữa chữa'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    money: {
                        $sum: '$totalPrice'
                    }
                }
            }
        ]);

        const serviceSellHistory = Service.aggregate([
            {
                $lookup: {
                    from: 'servicetypes',
                    localField: 'type',
                    foreignField: '_id',
                    as: 'type'            
                }
            }, 
            { $unwind: '$type' },
            {
                $match: {
                    'type.name': 'Mua Bán'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    money: {
                        $sum: '$totalPrice'
                    }
                }
            }
        ]);

        const result = await Promise.all([inputDeviceHistory, inputAccessoryHistory, serviceSellHistory, serviceFixHistory]);

        const [outMoneySell, outMoneyFix, inMoneySell, inMoneyFix] = result;

        const year = (_.uniqBy([
            ...outMoneySell,
            ...outMoneyFix,
            ...inMoneySell,
            ...inMoneyFix,
        ], '_id.year')).map(i => i._id.year);


        sendJsonResponse(res, 200, {
            line: {
                title: 'Thống kê nhiều năm',
                detail: {
                    time_value_list: year.map(item => '' + item),
                    legend_list: ['Tiền ra mua bán', ' Tiền ra sữa chữa', 'Tiền vào mua bán', 'Tiền vào sữa sữa', 'Tổng tiền ra', 'Tổng tiền vào'],
                    dataset: {
                        'Tiền ra mua bán': year.reduce((obj, y) => {
                            const rp = outMoneySell.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.money;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Tiền ra sữa chữa': year.reduce((obj, y) => {
                            const rp = outMoneyFix.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Tiền vào mua bán': year.reduce((obj, y) => {
                            const rp = inMoneySell.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Tiền vào sữa sữa': year.reduce((obj, y) => {
                            const rp = inMoneyFix.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.money;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Tổng tiền ra': year.reduce((obj, y) => {
                            const rp1 = outMoneySell.find(i => i._id.year === y);
                            const rp2 = outMoneyFix.find(i => i._id.year === y);

                            if (rp1) obj[y] = rp1.money;
                            else obj[y] = 0;

                            if (rp2) obj[y] += rp2.money;
                            else obj[y] += 0;

                            return obj;
                        }, {}),
                        'Tổng tiền vào': year.reduce((obj, y) => {
                            const rp1 = inMoneySell.find(i => i._id.year === y);
                            const rp2 = inMoneyFix.find(i => i._id.year === y);

                            if (rp1) obj[y] = rp1.money;
                            else obj[y] = 0;

                            if (rp2) obj[y] += rp2.money;
                            else obj[y] += 0;

                            return obj;
                        }, {})

                    }
                }
            }
        })
    } catch(err) {
        sendJsonResponse(res, 404, {
            'msg': 'Not Found'
        })
    }
}

const bar = async (req, res) => {
    try {
        const deviceCount = Device.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                    createdAt: '$createdAt',
                }
            },
            {
                $match: {
                    year: parseInt(req.query.year)
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                    },
                    count: {
                        $sum: 1,
                    }
                }
            }
        ]).exec();

        const accessoryCount = Accessory.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                    createdAt: '$createdAt',
                }
            },
            {
                $match: {
                    year: parseInt(req.query.year)
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                    },
                    count: {
                        $sum: 1,
                    }
                }
            }
        ]).exec();

        const serviceFixCount = Service.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                    createdAt: '$createdAt',
                    serviceType: '$serviceType',
                }
            },
            {
                $match: {
                    year: parseInt(req.query.year)
                }
            },
            {
                $lookup: {
                    from: ServiceType.model.name,
                    localField: 'serviceType',
                    foreignField: '_id',
                    as: 'serviceType',
                }
            }, {
                $unwind: '$serviceType',
            }, {
                $match: {
                    'serviceType.name': 'Sữa chữa'
                }
            }, {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        serviceType: '$serviceType.name'
                    },
                    count: {
                        $sum: 1,
                    }
                }

            }
        ]).exec();

        const serviceSellCount = Service.aggregate([
            {
                $project: {
                    year: { $year: '$createdAt' },
                    createdAt: '$createdAt',
                    serviceType: '$serviceType',
                }
            },
            {
                $match: {
                    year: parseInt(req.query.year)
                }
            },
            {
                $lookup: {
                    from: ServiceType.model.name,
                    localField: 'serviceType',
                    foreignField: '_id',
                    as: 'serviceType',
                }
            }, {
                $unwind: '$serviceType',
            }, {
                $match: {
                    'serviceType.name': 'Mua Bán'
                }
            }, {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        serviceType: '$serviceType.name'
                    },
                    count: {
                        $sum: 1,
                    }
                }

            }
        ]).exec();

        const result = await Promise.all([deviceCount, accessoryCount, serviceSellCount, serviceFixCount]);

        const [reportDevice, reportAccessory, reportServiceSell, reposrtServiceFix] = result;

        const month = (_.uniqBy([
            ...reportDevice,
            ...reportAccessory,
            ...reportServiceSell,
            ...reposrtServiceFix,
        ], '_id.year')).map(i => i._id.month);


        sendJsonResponse(res, 200, {
            line: {
                title: 'Thống kê theo 1 nam',
                detail: {
                    time_value_list: month.map(item => '' + item),
                    legend_list: ['Thiết bị', 'Linh kiện', 'Mua bán', 'Sửa chữa'],
                    dataset: {
                        'Thiết bị': month.reduce((obj, y) => {
                            const rp = reportDevice.find(i => i._id.month === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Linh kiện': month.reduce((obj, y) => {
                            const rp = reportAccessory.find(i => i._id.month === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Mua bán': month.reduce((obj, y) => {
                            const rp = reportServiceSell.find(i => i._id.month === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Sửa chữa': month.reduce((obj, y) => {
                            const rp = reposrtServiceFix.find(i => i._id.month === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {})
                    }
                }
            }
        })
    } catch(err) {
        sendJsonResponse(res, 404, {
            'msg': 'Not Found'
        })
    }
}

module.exports = {
    line,
    bar
}