var User = require('../models/user.js');
var Document = require('../models/document.js');
var Role = require('../models/role.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');

module.exports = {
  login: function(req, res) {
    User.findOne( {email: req.body.email} )
      .select('name email password role username')
      .populate('role')
      .exec(function(err, user) {
        if (err) {
          return res.status(500).send({
            message: 'Failed to log in, try again'
          });
        }
        if (!user) {
          return res.status(401).send({
            message: 'Email does not exist'
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.status(401).send({
              message: 'Wrong password'
            });
          } else {
            var token = jwt.sign({
              _id: user._id,
              user: user,
              email: user.email,
              role: user.role,
              name: user.name,
              username: user.username
            }, config.secret, {
              expiresIn: '24h'
            });
            res.status(200).send({
              token: token,
              user: user
            });
          }
        }
      });
  },

  create: function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.name = {first: req.body.first, last: req.body.last};
    user.email = req.body.email;
    user.password= req.body.password;

    Role.findOne( {title: req.body.role}, function(err, role) {
      if (err) {
        res.status(500).send({
          message: 'Error occured'
        });
      }
      if (!role) {
        res.status(403).send({
          message: 'No such role exists'
        });
      } else if (role) {
        user.role = role._id;

        user.save(function(err, user) {
          if (err) {
            if (err.code === 11000) {
              res.status(403).send({
                message: 'Duplicate entry'
              });
            } else {
              res.status(500).send({
                message: 'Error occured while saving the user'
              });
            }
          } else {
            var token = jwt.sign({
              _id: user._id,
              email: user.email,
              role: user.role
            }, config.secret, {
              expiresIn: '24h'
            });
            res.status(200).send({user, token});
          }
        });
      }
    });
  },

  get: function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.status(500).send({
          message: 'Error occured while accessing the user'
        });
      } else {
        res.status(200).json(users);
      }
    });
  },

  update: function(req, res) {
    if (req.decoded.role.permissions === 'readwrite') {
      User.findById(req.params.user_id, function(err, user){
        if (err){
          res.status(500).send({
            message: 'Error occured while accessing the user.'
          });
        }
        if (!user) {
          res.status(404).send({
            message: 'User not found'
          });
        } else{
          if (req.body.username) { user.username = req.body.username; }
          if (req.body.first || req.body.last) {
            user.name = {first: req.body.first, last: req.body.last};
          }
          if (req.body.email) { user.email = req.body.email; }
          if (req.body.password) { user.password= req.body.password; }

          user.save(function(err, user) {
            if (err) {
              res.status(500).send({
                message: 'Error occured while saving the user.'
              });
            } else {
              res.status(200).send(user);
            }
          });
        }
      });
    } else {
      User.findOne({
        $and: [{_id: req.params.user_id}, {_id: req.decoded._id}]
      }, function(err, user) {
        if (err) {
          return res.status(500).send({
            message: 'Error occured while accessing the user.'
          });
        }
        if (!user) {
          res.status(403).send({
            message: 'Not allowed to update this user'
          });
        } else {
          if (req.body.username) { user.username = req.body.username; }
          if (req.body.first || req.body.last) {
            user.name = {
              first: req.body.first,
              last: req.body.last
            };
          }
          if (req.body.email) { user.email = req.body.email; }
          if (req.body.password) { user.password= req.body.password; }

          user.save(function(err, user) {
            if (err) {
              res.status(500).send({
                message: 'Error occured while saving the user.'
              });
            } else {
              res.status(200).send(user);
            }
          });
        }
      });
    }
  },

  find: function(req, res) {
    User.findOne( {_id: req.params.user_id}, function(err, user) {
      if (err) {
        res.status(500).send({
          message: 'Error occured while accessing the user.'
        });
      }
      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
      } else {
        res.status(200).send(user);
      }
    });
  },

  remove: function(req, res) {
    if(req.decoded.role.permissions === 'readwrite') {
      User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err) {
          res.status(500).send({
            message: 'Error occured while accessing the user.'
          });
        } else {
          res.status(200).send(user);
        }
      });
    } else {
      User.findOne({
        $and: [{_id: req.params.user_id}, {_id: req.decoded._id}]
      }, function(err, user) {
        if (err) {
          res.status(500).send({
            message: 'Error occured while accessing the user.'
          });
        } else if (!user) {
          res.status(403).send({
            message: 'Not allowed to delete users'
          });
        } else {
          user.remove({_id: req.params.user_id}, function(err, user){
            if (err) {
              res.status(500).send({
                message: 'Error occured while accessing the user.'
              });
            } else {
              res.status(200).send(user);
            }
          });
        }
      });
    }
  },

  findUserDocuments: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.status(500).send({
          message: 'Error occured while getting users'
        });
      }
      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
      } else {
        Document.find({
          $and: [ {ownerId: user._id}, {
            $or: [ {accessLevel: 'public'}, {ownerId: req.decoded._id} ]
          }]
        })
        .exec(function(err, documents){
          if (err){
            res.status(500).send({
              message: 'Error occured while getting documents'
            });
          } else {
            res.status(200).send(documents);
          }
        });
      }
    });
  }
};
