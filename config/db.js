var config = require('./config.js');
var mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var DB_URI;

if (process.env.NODE_ENV == 'development') {
  DB_URI = config.dev_database;
} else if (process.env.NODE_ENV == 'testing') {
  DB_URI = config.test_database;
}

mongoose.connect(DB_URI, function(err){
  if (err){
    console.log('Database connection error: ', err);
  }else {
    console.log('Database connected successfully', DB_URI);
  }
});
