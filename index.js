var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var config = require('./config/config');
var router = express.Router();


dotenv.load();
var env = process.env.NODE_ENV;

require('./config/db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes(router));

app.listen(config.port,  function(err){
  if (err){
    console.log('Port not reached: ', err);
  } else {
    console.log('Magic port right here');
  }
});

module.exports = app;
