const mongoose = require('mongoose');

const User = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  secondName: {
    type:String
  },
  strava: {
    type: String
  },
  hashedPass: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('registered-users', User);