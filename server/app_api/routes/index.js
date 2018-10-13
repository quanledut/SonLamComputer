const express = require('express');
const router = express.Router();
/* ServiceType Api */

require('./device')(router)
require('./role')(router)
require('./service')(router)
require('./user')(router)

module.exports = router;
