if(process.env.NODE_ENV !== 'production'){
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
const initializePassport = require('./passport-config');

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
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
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
// passport.use(new LocalStrategy((email, password, done) => {
//   if(email === req.email && password === req.password){
//       return done(null, {email: req.email});
//   }
//   else {
//       return done(null, false);
//   }
// }));

// passport.serializeUser((user, done) => { done(null, user.email) })
// passport.deserializeUser((user, done) => { done(null, user.email) })


app.listen(port, (req, res) => console.log(`System running at http://localhost:${port}`));  