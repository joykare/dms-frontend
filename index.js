var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var routes = require('./server/routes');
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes(router));

mongoose.connect(config.test_database, function(err){
  if (err){
    console.log('Database connection error: ', err);
  }else {
    console.log('Database connected successfully');
  }
});

app.listen(config.port,  function(err){
  if (err){
    console.log('Port not reached: ', err);
  } else {
    console.log('Magic port right here');
  }
});

module.exports = app;
