const mongoose = require('mongoose');

const emptyDefaultString = {
  type: String,
  default: ''
}

const User = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  hashedPass: {
    type: String,
    require: true
  },
  userInfo: {
    Name: emptyDefaultString,
    SecondName: emptyDefaultString,
    Strava: emptyDefaultString,
    Gender: emptyDefaultString,
    Location: emptyDefaultString,
    Weight: emptyDefaultString,
    About: emptyDefaultString 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('registered-users', User);