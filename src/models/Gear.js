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
  name: emptyDefaultString,
  types: emptyDefaultString,
  weight: {
    type: Number,
    default: ''
  },
  brand: emptyDefaultString,
  model: emptyDefaultString,
  notes: emptyDefaultString,
});

module.exports = mongoose.model('gear', Gear);