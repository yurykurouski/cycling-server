const mongoose = require('mongoose');

const registeredUsersSchema = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  hashedPass: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('registered-users', registeredUsersSchema);