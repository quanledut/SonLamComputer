const express = require('express');
const router = express.Router();
/* ServiceType Api */

require('./device')(router)
require('./accessory')(router)
require('./role')(router)
require('./service')(router)
require('./user')(router)
require('./report')(router)

// require('./computer')(router)

module.exports = router;
