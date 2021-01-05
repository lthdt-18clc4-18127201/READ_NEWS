const { render } = require("node-sass");
const Post = require('../Models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class UserController {
    storedNews(req, res, next) {
        Post.find({})
            .then(posts => res.render('user/stored_news', { posts:mutipleMongooseToObject(posts) }))
            .catch(next)
    };

    trashNews(req, res, next) {
        Post.findDeleted({})
            .then(posts => res.render('user/trash_news', { posts:mutipleMongooseToObject(posts) }))
            .catch(next)
    };
}
module.exports = new UserController;