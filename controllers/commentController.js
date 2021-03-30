var Comments = require('../models/comment');

//Display list of Bands
exports.comment_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Comments');
};
exports.comment_list_group = function(req, res) {
  res.send('NOT IMPLEMENTED: Comments by group');
};
exports.comment_list_album = function(req, res) {
  res.send('NOT IMPLEMENTED: Comments by album');
};

// Display comment create form on GET.
exports.comment_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Comment create GET');
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Commnet create POST');
};
