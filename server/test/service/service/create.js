process.env.NODE_ENV = 'test';
const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { api, token } = require('../../shared/variables.json');
const { removeService } = require('../../shared/utils');

chai.use(chaiHttp);

describe('[Create Service] Api', () => {
    let serviceTypes = []
    let baseData
    before(async () => {
        await removeService();
        let res = await chai.request(server)
            .get(api.get.serviceTypes)
            .set('Authorization', 'Bearer ' + token.user)
        serviceTypes = res.body

        baseData = {
            serviceType: serviceTypes[0]._id,
            customer_name: "Test",
            customer_id_card: "123456789",
            devices: [{
                computerName: "Dell 1024",
                deviceType: "Keyboard",
                guaranteeDuration: 30,
                price: 10
            }],
            totalPrice: 10
        }
    })

    describe('[Create Service] Permission', () => {
        it('When_HasNoAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.services)
                .set('Content-Type', 'application/json')
                .send(baseData)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })
        
        it('When_UserHasNoCreatePolicy_Expect_Fail', (done) => {
            chai.request(server)
                .post(api.post.services)
                .set('Authorization', 'Bearer ' + token.user)
                .set('Content-Type', 'application/json')
                .send(baseData)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                })
        })

        it('When_UserHasCreatePolicy_Expect_Success', (done) => {
            chai.request(server)
                .post(api.post.services)
                .set('Authorization', 'Bearer ' + token.root_admin)
                .set('Content-Type', 'application/json')
                .send(baseData)
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                })
        })
    })

    describe('[Create Service] Behavior', () => {
        it('When_HasInvalidServiceType_Expect_Fail', (done) => {
            done(new Error("Not yet implemented"))
        })

        it('When_HasEmptyDevices_Expect_Fail', (done) => {
            done(new Error("Not yet implemented"))
        })

        it('When_HasEmptyDevices_Expect_Fail', (done) => {
            done(new Error("Not yet implemented"))
        })

        it('When_TotalPrice_Is_Not_Equal_Sum_Of_Prices_Expect_Fail', (done) => {
            done(new Error("Not yet implemented"))
        })

        it('When_Has_Valid_Input_Expect_Success', (done) => {
            done(new Error("Not yet implemented"))
        })
    })
})