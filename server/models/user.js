var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    validate: {
      validator: function(email){
        return /\w+@\w+\.\w+/.test(email);
      },
      message: '{VALUE} is not a valid email address!'
    },
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }

});

// hash password before user is saved
userSchema.pre('save', function (next) {
  var user = this;
  // hash only if the password has been changed OR user is new
  if (!user.isModified('password'))
    return next();
  //generate the hash
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err)
      return next(err);
    user.password = hash;
    next();
  });
});

// method to compare a give password with the db hash
userSchema.methods.comparePassword = function (password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);
