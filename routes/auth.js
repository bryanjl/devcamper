const express = require('express');
const { register, login } = require('../controllers/auth');

const router = new express.Router();

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

    module.exports = router;