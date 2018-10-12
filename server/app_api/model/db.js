const config = require('../../config.json');
let mongoose;
if (process.env.NODE_ENV === 'test') mongoose = require( 'mongoose')
else mongoose = require( 'mongoose');
let dbURI
let db_info;
if (process.env.NODE_ENV === 'test') {
	db_info = config.db_test;
} else if (process.env.NODE_ENV === 'production') {
	db_info = config.db_production;
} else {
	db_info = config.db_development;
}

dbURI = `mongodb://${db_info.username}:${db_info.password}@${db_info.host}:${db_info.port}/${db_info.db_name}`;

mongoose.connect(dbURI, { 
	useCreateIndex: true,
	useNewUrlParser: true
})

let gracefulShutdown = (msg, cb)=> {
	mongoose.connection.close(()=> {
		console.log("Mongoose disconnected through " + msg);
		cb();
	})
}

mongoose.connection.on('connected', ()=> {
	console.log("Mongoose is connected to " + dbURI);
})

mongoose.connection.on('error', (err)=> {
	console.log("Mongoose connection error: " + err);
})

mongoose.connection.on('disconnected', ()=> {
	console.log("Mongoose disconnected");
})


process.once("SIGUSR2", ()=> {
	gracefulShutdown('Nodemon restart', ()=> {
		process.kill(process.pid, 'SIGUSR2');
	})
})

process.on("SIGINT", ()=> {
	gracefulShutdown('App termination', ()=> {
		process.exit(0);
	})
})

process.on("SIGTERM", ()=> {
	gracefulShutdown("Heroku app shutdown", ()=> {
		process.exit(0);
	})
})

require("./user/users")
require("./user/roles")
require("./user/policy")

require("./device/computerTypes")
require("./device/computerNames")
require("./device/deviceTypes")
require("./device/devices")
require("./device/storageHistories")

require("./service/serviceTypes")
require("./service/services")
require("./service/serviceHistories")