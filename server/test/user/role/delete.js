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

const getDeleteApi = (roleId) => {
    return api.roles.deleteById.replace(":roleId", roleId)
}

describe('[Delete role] Api', () => {
    let baseRoles = [];
    let roles = []
    before((done) => {
        chai.request(server)
            .get(api.roles.find)
            .set('Authorization', 'Bearer ' + token.root_admin)
            .end((err, res) => {
                baseRoles = res.body;
                roles = baseRoles.filter((e) => {
                    return e.name != "root_admin" && e.name != "user"
                })
                done();
            })
    })

    describe('[Delete Role] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .delete(getDeleteApi(roles[0]._id))
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoUpdatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .delete(getDeleteApi(roles[0]._id))
                .set('Authorization', 'Bearer ' + token.user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasUpdatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .delete(getDeleteApi(roles[0]._id))
                .set('Authorization', 'Bearer ' + token.root_admin)
                .end((err, res) => {
                    res.status.should.equal(204);

                    chai.request(server)
                    .get(api.roles.find)
                    .set('Authorization', 'Bearer ' + token.root_admin)
                    .end((err, res) => {
                        (baseRoles.length - res.body.length).should.equal(1);
                        done();
                    })
                })
        })
    })
})