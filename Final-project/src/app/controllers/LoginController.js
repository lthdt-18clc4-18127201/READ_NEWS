const User = require('../Models/User');
const { mongooseToObject } = require('../../util/mongoose');

class LoginController {
    index(req ,res, next) {
        res.render('login')
    };

    secret(req ,res, next) {
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            res.redirect('/login');
        }
    };
};

module.exports = new LoginController;