const { render } = require("node-sass");
const Post = require('../Models/Post');
const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class MeController {
    storedNews(req, res, next) {
        Post.find({})
            .then(posts => res.render('me/stored_news', { posts:mutipleMongooseToObject(posts) }))
            .catch(next)
    };

    trashNews(req, res, next) {
        Post.findDeleted({})
            .then(posts => res.render('me/trash_news', { posts:mutipleMongooseToObject(posts) }))
            .catch(next)
    };

    edit(req, res, next) {
        User.findById(req.params.id)
            .then(user => res.render('me/edit', { user: mongooseToObject(user) }))
            .catch(next)
    };

    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }
}
module.exports = new MeController;