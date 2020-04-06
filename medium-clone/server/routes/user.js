const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup',UserController.user_signup);
router.post('/login',UserController.user_login);
router.post('/follow',checkAuth,UserController.follow_user);
router.get('/:userId',checkAuth,UserController.getUser)

module.exports = router;