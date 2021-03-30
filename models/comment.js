// Comment schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  timedate: {
    type: Date,
    required: true,
    maxlength: 12
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000
  },
  name: {
    type: String,
    required: true,
    maxlength: 72
  },
  email: {
    type: String,
    required: true,
    maxlength: 128
  },
});


CommentSchema.virtual('url').get(function() {
  return '/catalog/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
