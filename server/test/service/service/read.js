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

describe('[Read ServiceType] Api', () => {
    describe('[Read All ServiceType] Api', () => {
        describe('[Read All ServiceType] Permission', () => {
            it('Not yet implemented', (done) => {
                done(new Error("Not yet implemented"))
            })
        })    
    })

    describe('[Read ServiceType By ID] Api', () => {
        let types = [];

        describe('[Read ServiceType By ID] Permission', () => {
            it('Not yet implemented', (done) => {
                done(new Error("Not yet implemented"))
            })
        })
    })
})