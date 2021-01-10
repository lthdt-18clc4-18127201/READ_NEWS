const User = require('../Models/User');
const { mongooseToObject } = require('../../util/mongoose');
const Post = require('../Models/Post');
const { render } = require('node-sass');
const { mutipleMongooseToObject } = require('../../util/mongoose');
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
    async search(req, res) {
        
        const post_list = await Post.find()
        var found_list=[]
        for(var i=0;i<post_list.length;i++){

           if(post_list[i].content.search(req.body.search)!=-1){
                found_list.push(post_list[i]._id)
           }
        }
        var found_object=[]
        //console.log(found_list)
        for(var i=0;i<found_list.length;i++){
            console.log(await Post.findById(found_list[i]))
            found_object.push(await Post.findById(found_list[i]))
        }
        res.render('news',{posts: mutipleMongooseToObject(found_object)})
        //res.redirect('/')
    }
}
module.exports = new SiteController;