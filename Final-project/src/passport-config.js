const LocalStrategy = require('passport-local').Strategy;
const User = require('./app/Models/User');

function initialize(passport) {

    const authenticateUser = async (email, passport, done) => {
        const user = await User.findOne({email: email, password:passport});

       //console.log(user)
       
        if(user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        else{
            return done(null, user)
        }
        return done(null, false)
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null,user))
    passport.deserializeUser((id, done) => done(null,id))
}

module.exports = initialize;