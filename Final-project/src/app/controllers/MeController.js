const { render } = require("node-sass");
const Post = require('../Models/Post');
const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class MeController {
    storedNews(req, res, next) {
        var check = false
        if(req.isAuthenticated()) {
            check = true
        } else {
            check = false
        }
        Post.find({})
            .then(posts => res.render('me/stored_news', { 
                posts:mutipleMongooseToObject(posts),
                check,
            }))
            .catch(next)
    };

    trashNews(req, res, next) {
        var check = false
        if(req.isAuthenticated()) {
            check = true
        } else {
            check = false
        }
        Post.findDeleted({})
            .then(posts => res.render('me/trash_news', { 
                posts:mutipleMongooseToObject(posts),
                check,
            }))
            .catch(next)
    };

    edit(req, res, next) {
        var check = false
        if(req.isAuthenticated()) {
            check = true
        } else {
            check = false
        }
        User.findById(req.user._id)
            .then(user => res.render('me/edit', { 
                user: mongooseToObject(user),
                check,
            }))
            .catch(next)
    };

    update(req, res, next) {
        var check = false
        if(req.isAuthenticated()) {
            check = true
        } else {
            check = false
        }
        User.updateOne({ _id: req.user._id }, req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }
}
module.exports = new MeController;