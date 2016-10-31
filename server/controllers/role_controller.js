var Role = require('../models/role');

module.exports = {
  access: function(req, res, next) {
    if (req.decoded.role.permissions === 'readwrite') {
      next();
    } else {
      res.status(403).send({
        message: 'You are not authorized to execute action'
      });
    }
  },

  get: function(req, res) {
    Role.find(function(err, roles) {
      if (err) {
        res.status(500).send({
          message: 'Error occured during request'
        });
      } else {
        res.status(200).send(roles);
      }
    });
  },

  create: function(req, res) {
    var possibleActions = Role.schema.path('permissions').enumValues;
    var role = new Role();
    role.title = req.body.role;

    if (possibleActions.indexOf(req.body.permissions) !== -1) {
      role.permissions = req.body.permissions;

      role.save(function(err, role) {
        if (err) {
          if (err.code === 11000) {
            res.status(403).send({
              message: 'Duplicate entry'
            });
          } else {
            res.status(500).send({
              message: 'Error occured while saving the role'
            });
          }
        } else {
          res.send(role);
        }
      });
    } else {
      res.status(403).send({
        message: 'Not a possible permission'
      });
    }
  },

  update: function(req, res) {
    var possibleActions = Role.schema.path('permissions').enumValues;

    Role.findById(req.params.role_id, function(err, role) {
      if (req.body.role) {
        role.title = req.body.role;
      }
      if (req.body.permissions) {
        if (possibleActions.indexOf(req.body.permissions) !== -1) {
          role.permissions = req.body.permissions;
        } else {
          return res.status(403).send({
            message: 'Not a possible permission'
          });
        }
      }
      role.save(function(err, role) {
        if (err) {
          res.status(500).send({
            message: 'Error occured while saving the role'
          });
        } else {
          res.status(200).send(role);
        }
      });
    });
  },

  remove: function (req, res) {
    Role.remove({ _id: req.params.role_id}, function(err, role){
      if (err) {
        res.status(500).send({
          message: 'Error occured while removing the role'
        });
      } else {
        res.status(200).send(role);
      }
    });
  }
};
