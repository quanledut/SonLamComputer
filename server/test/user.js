process.env.NODE_ENV = 'test';
const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const mongoose = require('mongoose');
const User = mongoose.model('User');

chai.use(chaiHttp);


describe('User', () => {
	before((done)=> {
		User.remove({}, (err)=> {
			console.log(err);	
			User.find({}, (err, usrs)=> {
				console.log(usrs);
				done();
			})
		});
	})
	describe('Register', () => {
		it ('It should register user sucessfully', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post('/api/users')
				.type('form')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property('token');
					done();
				})
		});

		it ('It should throw error due to duplicate username', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})
		})
	})

	describe('Login', ()=> {
		it ('It should login fail', (done)=> {
			let form = {
				username: 'a',
				password: 'a'
			};

			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})

		it ('It should login successfully and retunr token', (done)=> {
			let form = {
				username: 'test',
				password: 'test'
			}

			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('token');
					done();
				})
		})

	})



})

