var mongoose = require('mongoose');
var config = require('../config/config');
var User = require('../server/models/user');
var Role = require('../server/models/role');
var Document = require('../server/models/document');

mongoose.connect(config.test_database, function(err){
  if(err) {
    console.log('error: ', err);
  }
});

mongoose.connection.on('connected', function(err){
  User.remove({}, function(err){
    if (err) {
      console.log('error: ', err );
    }else {
      console.log('Users deleted');
    }
  });

  Role.remove({}, function(err){
    if (err) {
      console.log('error: ', err );
    }else {
      console.log('Roles deleted');
    }
  });

  Document.remove({}, function(err){
    if (err) {
      console.log('error: ', err );
    } else {
      console.log('Documents deleted');
    }
    process.exit();
  });
});
