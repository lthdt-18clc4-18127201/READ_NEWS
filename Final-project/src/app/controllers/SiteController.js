const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Post = require('../Models/Post');
const { render } = require('node-sass');

class SiteController {
    home(req, res, next) {
        User.find({})
            .then(users => { res.render('homepage', { 
                users: mutipleMongooseToObject(users) });
            })
            .catch(next);
    }
    about(req, res) {
        res.render('inf')
    }
}
module.exports = new SiteController;