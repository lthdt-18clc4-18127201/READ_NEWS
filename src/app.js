const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const response  = require("express");
const morgan = require('morgan')
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const port = 3000;

const app = express();

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:true}));

app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));



app.get("/", (req, res) => {
    res.render('home');
});

app.get("/news", (req, res) => {
    res.render('news');
});

mongoose.connect("mongodb://127.0.0.1:27017/login",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
});



app.post("/", (req, res) => {
    request("https://www.facebook.com/supham1501", function(error, response, body){
    console.log(response.statusCode);
    })
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));