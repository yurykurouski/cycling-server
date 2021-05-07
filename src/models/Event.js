const mongoose = require('mongoose');

const requiredString = {
  type: String,
  require: true
}

const Event = mongoose.Schema({
  title: requiredString,
  adress: requiredString,
  description: {
    type: String
  },
  date: requiredString,
  terrain: {
    type: String
  },
  level: {
    type: String
  },
  author: requiredString,
  markerData: {
    type: Object
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('events', Event);