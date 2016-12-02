var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema ({
  ownerId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  ownerName: {
    type: String
  },
  ownerUsername: {
    type: String
  },
  ownerEmail: {
    type: String
  },
  permissions: {
    type: String
  },
  roleTitle: {
    type: String
  },
  accessLevel: {
    type: String,
    required: true,
    default: 'public'
  },
  content: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
},{ timestamps: {createdAt: 'createdAt', updatedAt: 'modifiedAt'} });

module.exports = mongoose.model('Document', documentSchema);
