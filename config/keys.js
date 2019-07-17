const keys_dev = require("./keys_dev");
const keys_prod = require("./keys_prod");

module.exports = process.env.NODE_ENV === "production" ? keys_prod : keys_dev;
