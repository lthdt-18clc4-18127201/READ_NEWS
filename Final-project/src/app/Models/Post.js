const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Post = new mongoose.Schema({
    title:{
        type:String,
    },
    img:{
        type:String,
    },
    genre:{
        type:String,
    },
    description:{
        type:String,
    },
    content:{
        type:String,
        minlength:1
    },
    author:{
        type: String,
    },
    slug: { 
        type: String, slug: "title", 
        unique: true,
    },
    comment:{
        type: String,
    }
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Post.plugin(mongooseDelete, {
    deletedAt: true, 
    overrideMethods: 'all', 
});

module.exports = mongoose.model('Post', Post);