const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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
    },
    author:{
        type: String,
    },
    slug: { 
        type: String, slug: "title", 
        unique: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', Post);