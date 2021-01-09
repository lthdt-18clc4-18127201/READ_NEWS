const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    name:{
        type:String,
        unique: true,
        minlength: 1,
    },
    email:{
        unique:true,
        type:String,
    },
    password:{
        type:String,
        minlength: 1,
    },
    role:{
        type:String,
        default:"reader",
    }
});

User.plugin(passportLocalMongoose);
User.pre('save', (next) => {
    if(!this.isModified('password')) {
        return next()
    }
})

module.exports = mongoose.model('User', User);