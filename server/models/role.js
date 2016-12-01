var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    unique: true,
    default: 'user',
    enum: ['admin', 'user']
  },
  permissions: {
    type: String,
    required: true,
    enum: ['read', 'readwrite']
  }
});

roleSchema.pre('save', function(next) {
  var permissionsDefaults = {
    'admin': 'readwrite',
    'user': 'read'
  };

  this.permissions = permissionsDefaults[this.title];
  next();
});

roleSchema.statics.initialize = function () {
  const role = this;
  return new Promise((resolve, reject) => {
    let defaults = role.schema.paths.title.enumValues;
    defaults = defaults.map((value) => {
      return { title: value };
    });

    role.create(defaults, (err, values) => {
      if (err) {
        reject(err);
      }
      resolve(values);
    });
  });
};

module.exports = mongoose.model('Role', roleSchema);
