const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017/post-web"

async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex:true, //work together
            useFindAndModify:false, // turn off warning
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!');
    }
    catch (error) {
        console.log('Connect failure!!');
    }
}

module.exports = {connect};
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex:true, //work together
//     useFindAndModify:false, // turn off warning
//     useUnifiedTopology: true
// })


