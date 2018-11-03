process.env.NODE_ENV = 'test';
const server = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const variables = require('../../shared/variables.json')

chai.use(chaiHttp);


describe('[Create User] Api', () => {
	before((done)=> {
		User.remove({
			username: {
				$nin: ["thanhson", "user"]
			}
		}, (err)=> {
			console.log(err);	
			User.find({}, (err, usrs)=> {
				done();
			})
		});
	})
	describe('[Register] Api', () => {
		it ('It should register user sucessfully', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post(variables.api.users.register)
				.type('form')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property('token');
					done();
				})
		});

		it ('It should throw new Error(err.response.data)or due to duplicate username', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post(variables.api.users.register)
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})
        })
        
        it ('When_RegisterSuccess_Expect_User_LoginSuccessfully', (done) => {
            chai.request(server)
                .post(variables.api.users.login)
                .set('Content-Type', 'application/json')
                .send({
                    "username": "test",
                    "password": "test"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('token')
                    done()
                })
        })
	})
})

