var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: String,
    required: true,
    enum: ['read', 'readwrite']
  }
});

module.exports = mongoose.model('Role', roleSchema);
