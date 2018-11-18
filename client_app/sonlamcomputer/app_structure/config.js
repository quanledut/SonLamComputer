let config = require("./config.development.json");

// if (process.env.REACT_APP_NODE_ENV === "staging") {
//   config = require("./config.staging.json");
// }

// if (process.env.REACT_APP_NODE_ENV === "production") {
//   config = require("./config.production.json");
// }
// const BASE_URL = "http://10.0.2.2:3001";
const BASE_URL = "http://18.216.184.198:3000";

module.exports = {
  // "API_URL": "http://18.216.184.198:3000/api"
  "API_URL": BASE_URL + "/api",
  BASE_URL
};
