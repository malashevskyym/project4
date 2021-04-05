var Group = require('../models/group');
var Comment = require('../models/comment');
var Album = require('../models/album');

var async = require('async');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
  };
//Display list of Bands
exports.group_list = function(req, res, next) {
  //res.send('Hello!');
  Group.find({}, 'name bio')
     .populate('album')
     .sort({'name': 1})
     .exec(function(err, list_groups) {
       if (err) {return next(err); }
        //Successful, so render
       res.json(list_groups);
     });
};
