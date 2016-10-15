var mongoose = require('mongoose');

var HandSchema = new mongoose.Schema({
  hand: Array
})

module.exports = mongoose.model('Hand', HandSchema);
