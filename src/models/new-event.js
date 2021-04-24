const mongoose = require('mongoose');

const requiredString = {
  type: String,
  require: true
}

const eventSchema = mongoose.Schema({
  title: requiredString,
  description: requiredString,
  author: requiredString,
  link: requiredString
}, {
  timestamps: true
});

module.exports = mongoose.model('events', eventSchema);