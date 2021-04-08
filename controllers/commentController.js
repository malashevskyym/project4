var Group = require('../models/group');
var Comment = require('../models/comment');
var Album = require('../models/album');

var async = require('async');

//const {body, validationResult} = require("express-validator");

//Display list of Bands
exports.comment_list = function(req, res) {
  Comment.find({}, 'text name email timedate')
     .populate('Comment')
     .sort('-timedate')
     .limit(5)
     .exec(function(err, list_comments) {
       if (err) {return next(err); }
        //Successful, so render
       res.json(list_comments);
     });
};
exports.comment_list_group = function(req, res) {
  async.parallel({
    group_id: function (callback) {
      Album.find({'group': {$eq: req.param("id")}}, '_id')
        .exec(callback)
    },
    group_comments: function(callback) {
      Comment.find({'album': {group_id}}, 'text name email timedate')
    },
  }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.album == null) { // No results.
            var err = new Error('Group not found');
            err.status = 404;
            return next(err);
        }
    res.json(album_comments);
  });
};

exports.comment_list_album = function(req, res) {
  Comment.find({'album': {$eq: req.param("id")}}, 'text name email timedate album')
     .populate('Comment')
     .sort('-timedate')
     .limit(5)
     .exec(function(err, list_comments_album) {
       if (err) {return next(err); }
        //Successful, so render
       res.json(list_comments_album);
     });
};

//Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
    res.render('comment_form', {title: 'Create Comment'});
};
exports.comment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};
