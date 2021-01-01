const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017/post-web"
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex:true, //work together
    useFindAndModify:false, // turn off warning
    useUnifiedTopology: true
})


