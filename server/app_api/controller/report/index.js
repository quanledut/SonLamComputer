const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const Accessory = mongoose.model('Accessory');
const Service = mongoose.model('Service');
const ServiceType = mongoose.model('ServiceType');
const _ = require('lodash');
const {sendJsonResponse} = require('../utils');
const {createPaginationQueryByAggregate} = require('../../helpers/paginationHelper')

const line = async (req, res) => {
    try {
        const deviceCount = Device.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    count: {
                        $sum: 1,
                    }
                }
            }
        ]).exec();

        const accessoryCount = Accessory.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' }
                    },
                    count: {
                        $sum: 1,
                    }
                }
            }
        ]).exec();

        const serviceFixCount = Service.aggregate([
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
                        year: { $year: '$createdAt' },
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
                        year: { $year: '$createdAt' },
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

        const year = (_.uniqBy([
            ...reportDevice,
            ...reportAccessory,
            ...reportServiceSell,
            ...reposrtServiceFix,
        ], '_id.year')).map(i => i._id.year);


        sendJsonResponse(res, 200, {
            line: {
                title: 'Thống kê nhiều năm',
                detail: {
                    time_value_list: year.map(item => '' + item),
                    legend_list: ['Thiết bị', 'Linh kiện', 'Mua bán', 'Sửa chữa'],
                    dataset: {
                        'Thiết bị': year.reduce((obj, y) => {
                            const rp = reportDevice.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Linh kiện': year.reduce((obj, y) => {
                            const rp = reportAccessory.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Mua bán': year.reduce((obj, y) => {
                            const rp = reportServiceSell.find(i => i._id.year === y);
                            if (rp) obj[y] = rp.count;
                            else obj[y] = 0;

                            return obj;
                        }, {}),
                        'Sửa chữa': year.reduce((obj, y) => {
                            const rp = reposrtServiceFix.find(i => i._id.year === y);
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