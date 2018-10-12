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

const getFindByIdApi = (serviceTypeId) => {
    return api.serviceTypes.findById.replace(":serviceTypeId", serviceTypeId)
}

chai.use(chaiHttp);

describe('[Read ServiceType] Api', () => {
    describe('[Read All ServiceType] Api', () => {
        describe('[Read All ServiceType] Permission', () => {
            it('When_HasNoAccessToken_Expect_Fail', (done) => {
                chai.request(server)
                    .get(api.serviceTypes.find)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    })
            })
            
            it('When_UserHasNoReadPolicy_Expect_Fail', (done) => {
                chai.request(server)
                    .get(api.serviceTypes.find)
                    .set('Authorization', 'Bearer ' + token.user)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    })
            })
    
            it('When_UserHasReadPolicy_Expect_Success', (done) => {
                chai.request(server)
                    .get(api.serviceTypes.find)
                    .set('Authorization', 'Bearer ' + token.root_admin)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        res.body.length.should.equal(2);
                        done();
                    })
            })
        })    
    })

    describe('[Read ServiceType By ID] Api', () => {
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

        describe('[Read ServiceType By ID] Permission', () => {
            it('When_HasNoAccessToken_Expect_Fail', (done) => {
                chai.request(server)
                    .get(getFindByIdApi(types[0]._id))
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    })
            })
            
            it('When_UserHasNoReadPolicy_Expect_Fail', (done) => {
                chai.request(server)
                .get(getFindByIdApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.user)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    })
            })
    
            it('When_UserHasReadPolicy_Expect_Success', (done) => {
                chai.request(server)
                .get(getFindByIdApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.root_admin)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        done();
                    })
            })
        })
    })
})