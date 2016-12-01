var Document = require('../models/document');
var Role = require('../models/role');

module.exports = {
  create: function(req, res) {
    var document = new Document();
    var upperCaseFirst = (name) => {
      return name.replace(/[a-z]/, name[0].toUpperCase());
    };

    document.ownerId = req.decoded._id || req.body.ownerId;
    if(req.decoded.name !== undefined) {
      return document.ownerName = upperCaseFirst(req.decoded.name.first) + ' ' + upperCaseFirst(req.decoded.name.last);
    }
    document.ownerEmail = req.decoded.email;
    document.title = req.body.title;
    document.content = req.body.content;
    document.roleTitle = req.decoded.role.title;
    document.role = req.decoded.role;
    if (req.body.accessLevel) {
      document.accessLevel = req.body.accessLevel;
    }
    document.save(function(err, document) {
      if (err) {
        if (err.code === 11000) {
          res.status(403).send({
            message: 'Duplicate entry'
          });
        } else {
          res.status(500).send({
            message: 'Error occured while saving the document'
          });
        }
      } else {
        res.status(200).send(document);
      }
    });
  },

  all: function(req, res) {
    var limit = req.query.limit || req.headers.limit;
    var skip = req.query.skip || req.headers.skip;
    var date = req.query.date;
    var role = req.query.role;

    var $query = {
      $and: [{
        $or: [{
          accessLevel: 'public'
        }, {
          ownerId: req.decoded._id}
        ]}
      ]
    };

    var cb = function(err, documents) {
      if (err) {
        res.status(500).send({
          message: 'An error occured when finding your document'
        });
      } else {
        res.status(200).send(documents);
      }
    };

    var findDocument = function(query) {
      Document.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 0)
        .sort('-createdAt')
        .exec(cb);
    };

    if (date) {
      var start = new Date(date);
      var end = new Date(start.getTime() + (24 * 60 * 60 * 1000));
      $query.$and.push({
        createdAt: {
          $gte: start,
          $lt: end
        }
      });
      findDocument($query);
    } else if (role) {
      Role.findOne( {title: role}, function(err, role) {
        $query.$and.push({
          role: role._id
        });
        findDocument($query);
      });
    } else {
      findDocument($query);
    }
  },

  find: function (req, res){
    Document.findOne({
      $and: [ {_id: req.params.document_id}, {
        $or: [ {ownerId: req.decoded._id}, {accessLevel: 'public'} ]}
      ]
    })
      .exec(function(err, document) {
        if (err){
          res.status(500).send({
            message: 'An error occured when finding your document'
          });
        }
        if (!document) {
          res.status(409).send({
            message: 'Document not found'
          });
        } else {
          res.status(200).send(document);
        }
      });
  },

  update: function(req, res) {
    Document.findOne({
      $and: [ {_id: req.params.document_id}, {
        $or: [ {ownerId: req.decoded._id}, {accessLevel: 'public'} ]}
      ]
    })
    .exec(function(err, document) {
      if (err) {
        res.status(500).send({
          message: 'An error occured when finding your document'
        });
      }
      if (!document){
        res.status(403).send({
          message: 'Not allowed to edit document'
        });
      } else {
        if (req.body.title) { document.title = req.body.title; }
        if (req.body.content) { document.content = req.body.content; }
        if (req.body.accessLevel) {
          document.accessLevel = req.body.accessLevel;
        }

        document.save(function(err) {
          if (err) {
            res.status(500).send({
              message: 'An error occured when saving your document'
            });
          } else {
            res.status(200).send(document);
          }
        });
      }
    });
  },

  remove: function(req, res) {
    Document.findOne({
      $and: [ {ownerId: req.decoded._id}, {_id: req.params.document_id} ]
    }, function (err, document) {
      if (err) {
        res.status(500).send({
          message: 'An error occured when deleting your document'
        });
      }
      if (!document) {
        res.send({
          message: 'You are not authorized to delete document'
        });
      } else {
        document.remove({_id: req.params.document_id}, function(err, document){
          if (err) {
            res.status(500).send({
              message: 'An error occured when deleting your document'
            });
          } else {
            res.status(200).send(document);
          }
        });
      }
    });
  },
};
