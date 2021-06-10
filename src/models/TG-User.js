const mongoose = require('mongoose');

const TGUser = mongoose.Schema({
  _id: Number,
  // userId: {
  //   type: Number,
  //   required: true
  // },
  subscribed: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('TG-users', TGUser);
