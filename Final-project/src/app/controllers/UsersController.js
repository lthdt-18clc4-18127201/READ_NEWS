const User = require('../Models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class UsersController {
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
            .then(users => res.render('users/stored_users', { 
                users: mutipleMongooseToObject(users),
                user: req.user,
                check,
                check_role,
            }))
            .catch(next);
    }

    ban(req, res, next) {
        var check = false
        var check_role = false 
        if(req.isAuthenticated()) {
            check = true
            if(req.user.role == "manager"){
                check_role = true
            }
        }
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
};

module.exports = new UsersController;