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

const getUpdateApi = (serviceTypeId) => api.serviceTypes.update.replace(":serviceTypeId", serviceTypeId)

describe('[Update ServiceType] Api', () => {
    let types = [];

    before((done) => {
        chai.request(server)
            .get(api.serviceTypes.find)
            .set('Authorization', 'Bearer ' + token.root_admin)
            .end((err, res) => {
                types = res.body;
                done();
            })
    })

    describe('[Update ServiceType] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .put(getUpdateApi(types[0]._id))
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa 1'
                })
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoUpdatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .put(getUpdateApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa 1'
                })
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasUpdatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .put(getUpdateApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa 1'
                })
                .end((err, res) => {
                    console.log(res.error); 
                    res.status.should.equal(200);
                    done();
                })
        })
    })
})