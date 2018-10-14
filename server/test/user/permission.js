process.env.NODE_ENV = 'test';
const fs = require('fs');
const path = require('path')
const server = require('../../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose')
const {CONSTANT} = require('../../app_api/model/user/policy')

let full_permission = 0
const numCollections = Object.keys(mongoose.connection.models).length

for (let key in CONSTANT) {
    if (CONSTANT.hasOwnProperty(key)) {
        full_permission += CONSTANT[key]
    }
}

let {api, token} = require('../shared/variables.json');

chai.use(chaiHttp);

describe('[Permission] api', () => {
    let roles = []
    describe('[root_admin permission]', () => {
        it('root_admin should have full access to all resources', (done) => {
            chai.request(server)
                .get(api.roles.find)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .end((err, res) => {
                    roles = res.body
                    res.status.should.equal(200)
                    const role_root_policies = res.body.filter((r) => r.name == "root_admin")[0].policies
                    const num_full_permission = role_root_policies.filter((p) => p.permission == full_permission).length
                    expect(num_full_permission).to.equal(numCollections)
                    done()
                })
        })
    })

    describe('[Permission] Behavior', () => {
        let modToken = ''
        before((done) => {
            chai.request(server)
                .post(api.users.login)
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'test',
                    'password': 'test'
                })
                .end((err, res) => {
                    modToken = res.body.token
                    done()
                })
        })

        describe('[Permission] on a specific collection named serviceTypes', () => {
            describe('[Permission] Before add the role to user', () => {
                it('When_Use_FindApi_Expect_Fail', (done) => {
                    chai.request(server)
                        .get(api.serviceTypes.find)
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })
                it('When_Use_Find_By_Id_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .get(api.serviceTypes.findById)
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })
                it('When_Use_Create_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .post(api.serviceTypes.create)
                        .set('Authorization', 'Bearer ' + modToken)
                        .set('Content-Type', 'application/json')
                        .send({
                            "name": "abc"
                        })
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })
                it('When_Use_Update_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .put(api.serviceTypes.updateById)
                        .set('Authorization', 'Bearer ' + modToken)
                        .set('Content-Type', 'application/json')
                        .send({
                            "name": "abc"
                        })
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })
                it('When_Use_Delete_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .delete(api.serviceTypes.deleteById)
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })

            })

            describe('[Permission] After add the role to user', () => {
                const fake_data = {
                    "name": "fake"
                }
                let fakeId = ""

                before(async () => {
                    const currentUserString = Buffer.from(modToken.split('.')[1], 'base64').toString('ascii')
                    const currentUser = JSON.parse(currentUserString)
                    const modRole = roles.filter((r) => r.name == "moderator")[0]

                    let res = await chai.request(server)
                        .put(api.users.updateById.replace(':userId', currentUser._id))
                        .set('Authorization', 'Bearer ' + token.root_admin)
                        .set('Content-Type', 'application/json')
                        .send({
                            ...currentUser,
                            roles: [modRole._id]
                        })
                    res.status.should.equal(200)

                    res = await chai.request(server)
                        .post(api.users.login)
                        .set('Content-Type', 'application/json')
                        .send({
                            'username': 'test',
                            'password': 'test'
                        })
                    modToken = res.body.token
        
                })
                it('When_Use_FindApi_Expect_Success', (done) => {
                    chai.request(server)
                        .get(api.serviceTypes.find)
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(200)
                            done()
                        })
                })
                it('When_Use_Create_Api_Expect_Success', (done) => {
                    chai.request(server)
                        .post(api.serviceTypes.create)
                        .set('Authorization', 'Bearer ' + modToken)
                        .set('Content-Type', 'application/json')
                        .send(fake_data)
                        .end((err, res) => {
                            res.status.should.equal(201)
                            fakeId = res.body._id
                            done()
                        })
                })

                it('When_Use_Find_By_Id_Api_Expect_Success', (done) => {
                    chai.request(server)
                        .get(api.serviceTypes.findById.replace(':serviceTypeId', fakeId))
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(200)
                            done()
                        })
                })

                it('When_Use_Update_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .put(api.serviceTypes.updateById.replace(':serviceTypeId', fakeId))
                        .set('Authorization', 'Bearer ' + modToken)
                        .set('Content-Type', 'application/json')
                        .send({
                            "name": "abc"
                        })
                        .end((err, res) => {
                            res.status.should.equal(200)
                            expect(res.body.name).to.equal("abc")
                            done()
                        })
                })
                it('When_Use_Delete_Api_Expect_Fail', (done) => {
                    chai.request(server)
                        .delete(api.serviceTypes.deleteById.replace(':serviceTypeId', fakeId))
                        .set('Authorization', 'Bearer ' + modToken)
                        .end((err, res) => {
                            res.status.should.equal(401)
                            expect(res.body).to.equal("Unauthorized")
                            done()
                        })
                })

            })

        })
    })
})