const session = require('express-session');

function initialize(app, sessionChecker) {
    app.use((req, res, next) => {
        if(req.session.user && req.cookies.user_sid) {
          res.redirect('/');
        }
      });
      
    sessionChecker = (req, res, next) => {
        if(req.session.user && req.cookies.user_sid) {
          res.redirect('/')
        } else {
          next()
        }
    }
}

module.exports = initialize;