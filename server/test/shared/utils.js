const mongoose = require('mongoose');
const ServiceType = mongoose.model('ServiceType');
const variables = require('./variables.json');

const User = mongoose.model('User');
const Role = mongoose.model('Role');

const removeServiceType = async () => {
    await ServiceType.remove({});
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

module.exports = {
    removeUsers,
    removeServiceType,
    removeRoles,

    getFindServiceTypeById,
    getUpdateServiceTypeById,
    getDeleteServiceTypeById
}