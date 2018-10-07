const ctrlUser = require('../controller/user/users');

const route_user = (router) => {
    /* User Api */
    router.post('/users', ctrlUser.register);
    router.post('/users/login', ctrlUser.login);
}

module.exports = route_user