//Album Schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 1000
  },
});


AlbumSchema.virtual('name').get(function() {
  return this.title;
});


AlbumSchema.virtual('url').get(function() {
  return '/catalog/album/' + this._id;
});

module.exports = mongoose.model('Album', AlbumSchema);
