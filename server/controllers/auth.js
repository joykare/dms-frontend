var jwt = require('jsonwebtoken');
var config = require('../../config/config');

module.exports = {
  auth: function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          res.status(400).send({ message: 'Failed to authenticate token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({ message: 'No token provided' });
    }
  }
};
