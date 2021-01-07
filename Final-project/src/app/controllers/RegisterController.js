var User = require('../Models/User');

class RegisterController {
    register(req, res){
        res.render('register');
    }

    async store(req, res) {
        const user = new User(req.body);
        user.save();
        res.redirect('/login');
    }
}
module.exports = new RegisterController;