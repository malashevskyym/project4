//Group Schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  bio: {
    type: String,
    required: false,
    maxlength: 1000
  },
});


GroupSchema.virtual('url').get(function() {
  return '/catalog/group/' + this._id;
});


module.exports = mongoose.model('Group', GroupSchema);
