const express = require('express');
const router = express.Router();

const multer = require('multer');
  
const upload = multer({dest : 'uploads/'});
    

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup',upload.single('userImage'),UserController.user_signup);
router.post('/login',UserController.user_login);
router.get('/:userId',checkAuth,UserController.getUser)

module.exports = router;