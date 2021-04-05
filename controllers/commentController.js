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
     .limit(2)
     //.limit(req.param({$lte: "nbr"}))
     .exec(function(err, list_comments) {
       if (err) {return next(err); }
        //Successful, so render
       res.json(list_comments);
     });
  //res.send('NOT IMPLEMENTED: Comments');
};
exports.comment_list_group = function(req, res) {
  res.send('NOT IMPLEMENTED: Comments by group');
};

exports.comment_list_album = function(req, res) {
  res.send('NOT IMPLEMENTED: Comments by album');
};

//Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
    res.render('comment_form', {title: 'Create Comment'});
};
exports.comment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};
