const mongoose = require("mongoose")
const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        default:"reader"
    }
})

const user = mongoose.model("Users",authorSchema)

module.exports = user