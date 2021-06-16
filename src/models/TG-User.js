const mongoose = require('mongoose');

const TGUser = mongoose.Schema({
  _id: Number,
  subscribed: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('TG-users', TGUser);
