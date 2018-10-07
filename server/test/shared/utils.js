const mongoose = require('mongoose');
const variables = require('./variables.json');

const User = mongoose.model('User');
const Role = mongoose.model('Role');
const ServiceType = mongoose.model('ServiceType');
const Service = mongoose.model('Service');

const removeServiceType = async () => {
    await ServiceType.remove({});
}

const removeService = async () => {
    await Service.remove({});
}


const removeUsers = async () => {
    let unames = [];
    for (var u in variables.usernamePassword) {
        if (variables.usernamePassword.hasOwnProperty(u)) {
            unames.push(variables.usernamePassword[u].username);
        }
    }
    await User.deleteMany({username: { $nin: unames }}).exec();
}

const removeRoles = async () => {
    await Role.deleteMany({name: {$nin: variables.roles}}).exec();
}

const getFindServiceTypeById = (id) => variables.api.get.serviceTypeById.replace(":serviceTypeId", id);
const getUpdateServiceTypeById = (id) => variables.api.put.serviceTypeById.replace(":serviceTypeId", id);
const getDeleteServiceTypeById = (id) => variables.api.delete.serviceTypeById.replace(":serviceTypeId", id);

const getFindServiceById = (id) => variables.api.get.serviceById.replace(":serviceId", id);
const getDeleteServiceById = (id) => variables.api.delete.serviceById.replace(":serviceId", id);


module.exports = {
    removeUsers,
    removeRoles,
    removeServiceType,
    removeService,

    getFindServiceTypeById,
    getUpdateServiceTypeById,
    getDeleteServiceTypeById,

    getFindServiceById,
    getDeleteServiceById
}