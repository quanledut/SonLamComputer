process.env.NODE_ENV = 'test';
const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const variables = require('../shared/variables.json');

chai.use(chaiHttp);

describe('[Crearte Role] Api', () => {
    describe('[Create Role] Permission', () => {

    })

    describe('[Create Role Behavior', () => {
        
    })
})