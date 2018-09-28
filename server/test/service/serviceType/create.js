process.env.NODE_ENV = 'test';
const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const { api, token } = require('../../shared/variables.json');
const { removeServiceType } = require('../../shared/utils');

chai.use(chaiHttp);

describe('[Create ServiceType] Api', () => {
    before(async () => {
        await removeServiceType();
    })

    describe('[Create ServiceType] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa'
                })
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoCreatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa'
                })
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasCreatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa'
                })
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                })
        })
    })

    describe('[Create ServiceType] Behavior', () => {
        it('When_CreateDuplicateRole_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Sữa Chữa'
                })
                .end((err, res) => {
                    res.status.should.equal(500);
                    done();
                })
        })

        it('When_CreateWithEmptyString_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    'name': ''
                })
                .end((err, res) => {
                    res.status.should.equal(400);
                    done();
                })
        })

        it('When_CreateNewValidRole_Expect_Success', (done) => {
            chai.request(server)
                .post(api.post.serviceTypes)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Thay Thế'
                })
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                })

        })
    })
})