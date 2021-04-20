const mongoose = require('mongoose');

const userIdsSchema = mongoose.Schema({
  _id: Number,
  userId: {
    type: Number,
    required: true
  },
  subscribed: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('userId', userIdsSchema);