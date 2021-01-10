const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class WebController {
    storedUsers(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role == "manager"){
                check_role = true
            }
        }
        User.find({})
            .then(users => res.render('web/stored_users', { 
                users: mutipleMongooseToObject(users),
                user: req.user,
                check,
                check_role,
            }))
            .catch(next)
    }
};

module.exports = new WebController;