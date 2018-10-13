process.env.NODE_ENV = 'test';
require('./create');

const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const { api, token } = require('../../shared/variables.json');
const utils = require('../../shared/utils');

chai.use(chaiHttp);

const getUpdateApi = (userId) => api.serviceTypes.update.replace(":updateById", userId)

describe('[Update User] Api', () => {
    let users = [];

    before((done) => {
        chai.request(server)
            .get(api.users.find)
            .set('Authorization', 'Bearer ' + token.root_admin)
            .end((err, res) => {
                users = res.body;
                done();
            })
    })

    it("Not yet implemented", (done) => {
        done(new Error("Not yet implemented"))
    })
})