const User = require('../Models/User');
const session = require('express-session');

class RegisterController {
    register(req, res){
        res.render('register');
    }

    async store(req, res) {
        const user = new User(req.body);
        user.save((err, docs) => {
            if(err) {
                res.redirect('/register');
            } else {
                req.session.user = docs;
            }
        });
        res.redirect('/login');
    }
}
module.exports = new RegisterController;