process.env.NODE_ENV = 'test';
const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const variables = require('../shared/variables.json');

chai.use(chaiHttp);


describe('[Login] api', () => {
	before((done)=> {
		let unames = [];
		for (var u in variables.usernamePassword) {
			if (variables.usernamePassword.hasOwnProperty(u)) {
				unames.push(variables.usernamePassword[u].username);
			}
		}
        User.deleteMany({username: { $nin: unames }}, (err, res) => {
            if (err) console.log(err);
            done();
        })
	})

	describe('[Login] Api', ()=> {
		it ('When_HasInvalidUsername_And_HasInvalidPassword_Expect_LoginFail', (done)=> {
			let form = {
				username: 'a',
				password: 'a'
			};

			chai.request(server)
				.post(variables.api.login)
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})

		it ('When_HasValidUsername_And_HasValidPassword_Expect_LoginSuccessAndReturnToken', (done)=> {
			let form = {
				username: variables.usernamePassword.root_admin.username,
				password: variables.usernamePassword.root_admin.password
			}

			chai.request(server)
				.post(variables.api.login)
				.type('form')
				.send(form)
				.end((err, res)=> {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.have.property('token');
					done();
				})
		})

	})



})

