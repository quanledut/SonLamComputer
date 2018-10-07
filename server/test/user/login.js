process.env.NODE_ENV = 'test';
const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const variables = require('../shared/variables.json');

chai.use(chaiHttp);

describe('[Login] api', () => {
	describe('[Login] Api', ()=> {
		it ('When_HasInvalidUsername_And_HasInvalidPassword_Expect_LoginFail', (done)=> {
			let form = {
				username: 'a',
				password: 'a'
			};

			chai.request(server)
				.post(variables.api.post.login)
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})

		it ('When_HasValidUsername_And_HasValidPassword_Expect_LoginSuccessAndReturnToken', (done)=> {
			let form = {
				username: variables.usernamePassword.user.username,
				password: variables.usernamePassword.user.password
			}

			chai.request(server)
				.post(variables.api.post.login)
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

