const User = require('../Models/User');
const { mongooseToObject } = require('../../util/mongoose');
const Post = require('../Models/Post');
const { render } = require('node-sass');

class SiteController {
    home(req, res, next) {
        var check = false
        if(req.isAuthenticated()) {
            check = true
        } else {
            check = false
        }
        res.render('homepage', {
            user: req.user,
            check,
        });
    }
    about(req, res) {
        res.render('inf')
    }
}
module.exports = new SiteController;