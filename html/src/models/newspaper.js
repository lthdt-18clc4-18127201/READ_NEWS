const mongoose = require("mongoose")
const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

const news = mongoose.model("Posts",newsSchema)

module.exports = news