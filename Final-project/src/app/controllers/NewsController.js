const { render } = require("node-sass");
const Post = require('../Models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class NewsController {
    async news(req, res, next) {
    //console.log(req.user.name)
       const post1 = await Post.findById("5ff3f3deda06430904bde257")
        console.log(post1.content.search("mưa"))
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
        const new_add = new Post(req.body);
        new_add.save();
        res.redirect('/me/stored/news');
    };

    edit(req, res, next) {
        Post.findById(req.params.id)
            .then(post => res.render('news/edit', { post: mongooseToObject(post) }))
            .catch(next)
    };

    // [PUT] /news/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    };

    delete(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };

    forcedelete(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };

    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };
}
module.exports = new NewsController;