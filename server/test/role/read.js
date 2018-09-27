process.env.NODE_ENV = 'test';
const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const variables = require('../shared/variables.json');

chai.use(chaiHttp);

describe('[View Role] Api', () => {
    describe('[View Role] Permission', () => {
        it('When_HasRootAdminAccessToken_Expect_Success', (done) => {
            chai.request(server)
                .get(variables.api.get.roles)
                .set('Authorization', "Bearer " + variables.token.root_admin)
                .end((err, res) => {
                    res.status.should.equal(200);
                    done()
                })
        })

        it('When_HasUserAccessToken_Expect_Fail', (done) => {
            chai.request(server)
                .get(variables.api.get.roles)
                .set('Authorization', "Bearer " + variables.token.user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done()
                })

        })
    })
})