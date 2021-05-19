const mongoose = require('mongoose');

const emptyDefaultString = {
  type: String,
  default: ''
}

const Gear = mongoose.Schema({
  owner: emptyDefaultString,
  active: {
    type: Boolean,
    default: false
  },
  brand: emptyDefaultString,
  model: emptyDefaultString,
  name: emptyDefaultString,
  notes: emptyDefaultString,
  types: emptyDefaultString,
  weight: {
    type: Number,
    default: ''
  },
});

module.exports = mongoose.model('gear', Gear);