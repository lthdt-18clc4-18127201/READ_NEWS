if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const passport = require('passport');
const route = require('./routes/app');
const db = require('./config/db/connect');
const flash = require("express-flash");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./app/Models/User');
const { DefaultSerializer } = require('v8');
const initializePassport = require('../src/config/passport/passport');
const initializeSession = require('../src/config/session/session');
const cookieParser = require('cookie-parser');

const port = 5000 || process.env.port
const app = express();
db.connect();

initializePassport(
    passport,
    email => User.find(user => user.email === email)
)

app.use(flash());
app.use(session({

    secret: "nothing",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    }

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);


app.listen(port, (req, res) => console.log(`System running at http://localhost:${port}`));