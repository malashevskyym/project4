var express = require('express');
var router = express.Router();

//Require controller modules.
var group_controller = require('../controllers/groupController');
var album_controller = require('../controllers/albumController');
var comment_controller = require('../controllers/commentController');

//Get Catalog home page
router.get('/', group_controller.index);

//Get request for creating a comment
router.get('/comment/create', comment_controller.comment_create_get);

router.get('/comment/create', comment_controller.comment_create_post);

//Get request for list of groups
router.get('/groups', group_controller.group_list);

//Get request for list of albums
router.get('/album/group/:id', album_controller.album_list_id);

//Get list of Comments
router.get('/comment/:nbr', comment_controller.comment_list);

//Get list of Comments for groups
router.get('group/:id/comments/:nbr', comment_controller.comment_list_group);

//Get list of Comments for albums
router.get('album/:id/comments/:nbr', comment_controller.comment_list_album);

module.exports = router;
