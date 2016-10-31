require('dotenv').config({silent:true});

module.exports = {
  test_database: process.env.TEST_MONGO_URL,
  port: process.env.PORT || 8080,
  secret: 'whatwhatwhatwhatwhat'
};
