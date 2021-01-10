const { render } = require("node-sass");
const Post = require('../Models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class NewsController {
    async news(req, res, next) {
    //console.log(req.user.name)
    var check = false
    var check_role = false 
    if(req.isAuthenticated()) {
        check = true
        if(req.user.role=="manager"){
            check_role=true
        }
    }
        Post.find({})
            .then(posts => {
                res.render('news', { posts: mutipleMongooseToObject(posts) ,user: req.user,check,check_role});
            })
            .catch(next);
    };
    show(req, res) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role=="manager"){
                check_role=true
            }
        }

        Post.findOne({slug: req.params.slug})
            .then(post => {
                res.render('news/show', { post: mongooseToObject(post),user: req.user,check,check_role });
            })
    };
    add(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role=="manager"){
                check_role=true
            }
        }

        res.render('news/add',{user: req.user,check,check_role})
    };

    store(req, res, next) {
        
        const new_add = new Post(req.body);
        new_add.save();
        res.redirect('/me/stored/news');
    };

    edit(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role=="manager"){
                check_role=true
            }
        }

        Post.findById(req.params.id)
            .then(post => res.render('news/edit', { post: mongooseToObject(post),user: req.user,check,check_role }))
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