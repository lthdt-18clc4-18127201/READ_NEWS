const { render } = require("node-sass");
const Post = require('../Models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class NewsController {
    news(req, res, next) {
        Post.find({})
            .then(posts => {
                res.render('news', { posts: mutipleMongooseToObject(posts) });
            })
            .catch(next);
    };
    show(req, res) {
        Post.findOne({slug: req.params.slug})
            .then(post => {
                res.render('news/show', { post: mongooseToObject(post) });
            })
    };
    add(req, res, next) {
        res.render('news/add')
    };

    store(req, res, next) {
        const formData = req.body;
        formData.image = req.body.img;
        const new_add = new Post(req.body);
        new_add.save();
        res.redirect('/news');
    };

    edit(req, res, next) {
        Post.findById(req.params.id)
            .then(post => res.render('news/edit', { post: mongooseToObject(post) })); 
        
    };
}
module.exports = new NewsController;