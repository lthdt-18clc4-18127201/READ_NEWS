const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('../app/controllers/LoginController');

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/login/secret',
    failureFlash: true,
}));
router.get('/secret', (req, res) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi secret no check A:UTH)
 
        res.redirect('/');//neu nhap dung thi ve trang chu
    } else {
        res.redirect('/login');//neu nhap sai pass thi no route lai ve login
    }
})

router.get('/', loginController.index);

module.exports = router;