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
    async search(req, res) {
        
        const post_list = await Post.find()
        var found_list=[]
        for(var i=0;i<post_list.length;i++){

           if(post_list[i].content.search(req.body.search)!=-1){
                found_list.push(post_list[i]._id)
           }
        }
        console.log(found_list)
      
        res.redirect('/')
    }
}
module.exports = new SiteController;