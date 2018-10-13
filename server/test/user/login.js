process.env.NODE_ENV = 'test';
const fs = require('fs');
const path = require('path')
const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

let variables = require('../shared/variables.json');

chai.use(chaiHttp);

describe('[Login] api', () => {
	describe('[Login] Api', ()=> {
		it ('When_HasInvalidUsername_And_HasInvalidPassword_Expect_LoginFail', (done)=> {
			let form = {
				username: 'a',
				password: 'a'
			};

			chai.request(server)
				.post(variables.api.users.login)
				.set('Content-Type', 'application/json')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})

		it ('When_RootAdmin_HasValidUsername_And_HasValidPassword_Expect_LoginSuccessAndReturnToken', (done)=> {
			let form = {
				username: variables.usernamePassword.root_admin.username,
				password: variables.usernamePassword.root_admin.password
			}

			chai.request(server)
				.post(variables.api.users.login)
				.set('Content-Type', 'application/json')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('token');
					let token = res.body.token

					variables.token.root_admin = token

					done();
				})
		})

		it ('When_User_HasValidUsername_And_HasValidPassword_Expect_LoginSuccessAndReturnToken', (done)=> {
			let form = {
				username: variables.usernamePassword.user.username,
				password: variables.usernamePassword.user.password
			}

			chai.request(server)
				.post(variables.api.users.login)
				.set('Content-Type', 'application/json')
				.send(form)
				.end((err, res)=> {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.have.property('token');
					let token = res.body.token

					variables.token.user = token
					fs.writeFileSync(path.resolve('test/shared/variables.json'), JSON.stringify(variables), 'utf8')
					done();
				})
		})


	})



})

