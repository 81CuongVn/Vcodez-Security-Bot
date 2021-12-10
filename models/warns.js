const { model, Schema } = require('mongoose');

const ecm = new Schema({
  Guild: String,
  User: String,
  Content: Array,
  Warns: Number
})

module.exports = model('warns', ecm)