const express = require('express'); 
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const articleController = require('../controllers/article');

router.post('/newArticle',checkAuth,articleController.create_new_article);
router.post('/like',checkAuth,articleController.clap_article);
router.post('/comment',checkAuth,articleController.comment_article);
router.get('/:id',checkAuth,articleController.get_article);


module.exports = router;