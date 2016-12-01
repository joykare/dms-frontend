require('dotenv').config({silent:true});

module.exports = {
  test_database: process.env.TEST_MONGO_URL,
  dev_database: process.env.DEV_MONGO_URL,
  prod_database: process.env.MONGOLAB_URI,
  port: process.env.PORT || 8080,
  secret: 'whatwhatwhatwhatwhat'
};
