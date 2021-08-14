const express = require('express');
const { register, login, getMe, forgotPassword } = require('../controllers/auth');

const router = new express.Router();

const { protect } = require('../middleware/auth');
router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router  
    .route('/me')
    .get(protect, getMe);

router
    .route('/forgotPassword')
    .post(forgotPassword);

module.exports = router;