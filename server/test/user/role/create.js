process.env.NODE_ENV = 'test';
const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const variables = require('../../shared/variables.json');
const utils = require('../../shared/utils')

chai.use(chaiHttp);

const baseDataMod = {
    name: "moderator",
    policies: [{
        collectionName: "ServiceType",
        isCreate: true,
        isRead: true,
        isUpdate: true
    }]
}

describe('[Crearte Role] Api', () => {
    before(async () => {
        let res = await chai.request(server)
            .get(variables.api.roles.find)
            .set('Authorization', 'Bearer ' + variables.token.root_admin)
        
        expect(res.status).to.equal(200)

        let roles = res.body
        let excludeRemove = roles
                            .filter((r) => ["root_admin", "user"].indexOf(r.name) != -1)
                            .map((r) => r._id)
        
        await utils.removeCollection("Role", {
            _id: {
                $nin: excludeRemove
            }
        })
    })
    describe('[Create Role] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .post(variables.api.roles.create)
                .set('Content-Type', 'application/json')
                .send(baseDataMod)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoCreatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .post(variables.api.roles.create)
                .set('Authorization', 'Bearer ' + variables.token.user)
                .set('Content-Type', 'application/json')
                .send(baseDataMod)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasCreatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .post(variables.api.roles.create)
                .set('Authorization', 'Bearer ' + variables.token.root_admin)
                .set('Content-Type', 'application/json')
                .send(baseDataMod)
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                })
        })

    })


    describe('[Create Policy] Permission Behavior', () => {
        it("When_CreateRole_With_Duplicate_Name_Expect_Fail", (done) => {
            chai.request(server)
                .post(variables.api.roles.create)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + variables.token.root_admin)
                .set('Content-Type', 'application/json')
                .send(baseDataMod)
                .end((err, res) => {
                    res.status.should.not.equal(201);
                    done();
                })
        })
    })

})