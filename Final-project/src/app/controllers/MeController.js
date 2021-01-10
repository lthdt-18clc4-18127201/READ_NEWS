const { render } = require("node-sass");
const Post = require('../Models/Post');
const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class MeController {
    storedNews(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role == "manager"){
                check_role=true
            }
        }

        Post.find({})
            .then(posts => res.render('me/stored_news', { 
                posts:mutipleMongooseToObject(posts),
                check,
                check_role,
            }))
            .catch(next)
    };

    trashNews(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role == "manager"){
                check_role = true
            }
        }

        Post.findDeleted({})
            .then(posts => res.render('me/trash_news', { 
                posts:mutipleMongooseToObject(posts),
                check,
                check_role,
            }))
            .catch(next)
    };

    edit(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role == "manager"){
                check_role = true
            }
        }

        User.findById(req.user._id)
            .then(user => res.render('me/edit', { 
                user: mongooseToObject(user),
                check,
                check_role,
            }))
            .catch(next)
    };

    async update(req, res, next) {
        
        User.updateOne({ _id: req.user._id }, req.body)
        .then(()=>req.user.name = req.body.name)
        .then(() => res.redirect('/'))
        .catch(next);
            
    }
}
module.exports = new MeController;