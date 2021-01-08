const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('../app/controllers/LoginController');

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/login/secret',
    failureFlash: true,
}));
router.get('/secret', loginController.secret);

router.get('/', loginController.index);

module.exports = router;