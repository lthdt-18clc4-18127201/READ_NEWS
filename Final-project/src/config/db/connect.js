const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/post-web"


async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect database successfully!');
    } catch {
        console.log('Connect database failure!');
    }
}

module.exports = { connect };