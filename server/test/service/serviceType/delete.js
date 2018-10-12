process.env.NODE_ENV = 'test';
require('./create');

const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const { api, token } = require('../../shared/variables.json');

chai.use(chaiHttp);

const getDeleteApi = (serviceTypeId) => {
    return api.serviceTypes.delete.replace(":serviceTypeId", serviceTypeId)
}

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
                .delete(getDeleteApi(types[0]._id))
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoUpdatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .delete(getDeleteApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasUpdatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .delete(getDeleteApi(types[0]._id))
                .set('Authorization', 'Bearer ' + token.root_admin)
                .end((err, res) => {
                    console.log(res.error); 
                    res.status.should.equal(204);
                    done();
                })
        })
    })
})