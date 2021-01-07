const newsRouter = require('./news');
const siteRouter = require('./site');
const loginRouter = require('./login');
const registerRouter = require('./register');
const meRouter = require('./me');
const logoutRouter = require('./logout');

function route(app) {    
    app.use('/news', newsRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/me', meRouter);
    app.use('/logout', logoutRouter);
    app.use('/', siteRouter);
}


module.exports = route;