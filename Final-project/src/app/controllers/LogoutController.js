const passport = require('passport');

class LogoutController {
    logout(req, res, next) {
      req.logOut()
      res.redirect('/');  
    };

};

module.exports = new LogoutController;