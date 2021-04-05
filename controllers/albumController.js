var Group = require('../models/group');
var Comment = require('../models/comment');
var Album = require('../models/album');

var async = require('async');

//Display list of Bands
exports.album_list_id = function(req, res) {
  Album.find({'group': {$eq: req.param("id")}}, 'title year _id')
     .populate('album')
     .sort({'year': 1})
     .exec(function(err, list_albums) {
       if (err) {return next(err); }
        //Successful, so render
       res.json(list_albums);
     });
  //res.send('NOT IMPLEMENTED: album list');
};
