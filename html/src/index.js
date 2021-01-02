const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
var mongoose = require('mongoose');
//const jsdom = require("jsdom")
const express = require('express');
const app = express();
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
const localStrategy = require('passport-local').Strategy;

const flash = require("express-flash")
app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
const port = 5000 || process.env.port

const method = require("./read_db/readJSON")

const staticAsset = __dirname + "/public"; // CSS IMG BLA BLA
const publicAsset = __dirname + "/templates/views" // HTML
const partialAsset = __dirname + "/templates/partials" //header footer


require("./mongoose/connect")
const { Store } = require('express-session');
const { authenticate } = require('passport');

app.use(express.static(staticAsset));
app.set("view engine", "hbs")
app.set("views", publicAsset)
hbs.registerPartials(partialAsset)

// ?id = req.query.id
// ?cc gì đó = req.query.cc gì đó ok
const ROUTER = require("./routers/router")
passport.use(new localStrategy( // m ko cho nó ô username passowrd à ?/co ma ? dau /ham local tu get string minh nhap o login 
  async (username, password, done) => {
    try{
      const user = await method.searcAccount(username, password) //
      console.log(user)
      if(!user){
          return done(null,false,{message:'Wrong username or password'})// ko co tac dung dau
      }
      else{
          return done(null,user)//a a qua dey ne// hack nao vl :v
      }
  }catch(e){
      return done(null,e)
  }

  }
))
passport.serializeUser((acc, done) => {
  done(null, acc);
})

passport.deserializeUser((acc, done) => {
  done(null, acc)
})

app.use(ROUTER) //chac ok r do ok bo may di chơi ghệ DF9ức ANh 


app.listen(port, () => {
  console.log("System on port " + port)
});
// app.get('/profile/edit', async (req, res) => {
//   const id = req.query.id
//    console.log(id)
//  docs = await Author.find()

//  res.render("edit",{list:docs})

// })
//  app.post('/profile/edit',async (req,res)=>{
//    const id = req.query.id
//    console.log(id)

//     await Author.findByIdAndUpdate({_id:id},{
//        name: req.body.name,
//        email: req.body.email,
//        password: req.body.password}
//  )
//    })
var ObjectID = require("mongodb").ObjectID;

var blog = client.db("blog")

app.post('/do-comment', function(req, res){
  blog.collection("read").update({ "_id": ObjectID(req.body.post_id)}, {
    $push: {
      "comments" : {username: req.body.username, comment: req.body.comment}
    }
  }, function(error, post){
      res.send("comment successfull")
  })
});