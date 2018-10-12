process.env.NODE_ENV = 'test';
const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const permission = require('../../../app_api/controller/permission')

const {token, api} = require('../../shared/variables.json');
const utils = require('../../shared/utils')

chai.use(chaiHttp);

describe('[Crearte Policy] Api', () => {
    let roles = []
    let baseRoleMod = {
        collectionName: "ServiceType",
        isCreate: true,
        isRead: true,
        isUpdate: true
    }
    let baseRoleUser = {
        collectionName: "ServiceType",
        isRead: true
    }

    before(async () => {
        let res = await chai.request(server)
            .get(api.roles.find)
            .set('Authorization', 'Bearer ' + token.root_admin)
        
        expect(res.status).to.equal(200)
        roles = res.body
    
        let excludeRemove = roles
                                .filter((r) => ["root_admin"].indexOf(r.name) != -1)
                                .map((r) => r._id)
        
        await utils.removeCollection("Policy", {
            roleId: {
                $nin: excludeRemove
            }
        })
        
        baseRoleMod = {
            ...baseRoleMod,
            roleId: roles.filter((r) => r.name == "moderator")[0]._id
        }

        baseRoleUser = {
            ...baseRoleUser,
            roleId: roles.filter((r) => r.name == "user")[0]._id
        }

        console.log(baseRoleUser)

    })
    describe('[Create Policy] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.policies.create)
                .set('Content-Type', 'application/json')
                .send(baseRoleMod)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoCreatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.policies.create)
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')
                .send(baseRoleMod)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasCreatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .post(api.policies.create)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send(baseRoleMod)
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                })
        })

    })

    describe('[Create Policy] Behavior', () => {
        it('When_UserCreatePolicyWithDuplicateTableName_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.policies.create)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send({
                    ...baseRoleMod,
                    permission: 12
                })
                .end((err, res) => {
                    res.status.should.not.equal(201);
                    done();
                })

        })

    })

    describe('[Create Policy] Permission Behavior', () => {
        it('When_HaveNotCreatePolicy_For_Role_User_Expect_Role_User_Cannot_Read_Service', (done) => {
            chai.request(server)
                .get(api.serviceTypes.find)
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })

        })

        it('When_Create_ReadPolicy_For_Role_User_Expect_Role_User_Can_Read_Service', async () => {
            //Create policy
            let res = await chai.request(server)
                .post(api.policies.create)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send(baseRoleUser)

            res.status.should.equal(201)

            res = await chai.request(server)
                .get(api.serviceTypes.find)
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')

            res.status.should.equal(200);


        })

    })

    after(async () => {
        let res = await chai.request(server)
            .get(api.roles.find)
            .set('Authorization', 'Bearer ' + token.root_admin)

        expect(res.status).to.equal(200)
            roles = res.body
        
            let excludeRemove = roles
                                    .filter((r) => ["root_admin"].indexOf(r.name) != -1)
                                    .map((r) => r._id)
            
            await utils.removeCollection("Policy", {
                roleId: {
                    $nin: excludeRemove
                }
            })
    
    })


})