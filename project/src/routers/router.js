const express = require("express")
const router = new express.Router()
const Users = require("../models/users")
const Post = require("../models/newspaper")
const passport = require("passport")
const method = require("../read_db/readJSON");
const path = require("path")


router.route('/login')
    .get((req, res) => res.render('login'))
    .post(passport.authenticate('local', { //chọn phương thức check là local => npm install passport-local
        failureRedirect: '/login',  //nếu check không đúng thì redirect về link này
        successRedirect: '/secret',//o day ne//neu m nhap sai thi no se dan m toi secret a det t noi nham :)) neu m sai thi quay ve login 
        failureFlash: true,
    }));
//router.get('/loginOK', (req, res) => res.send('Thành công'));
router.get('/secret', (req, res) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi secret no check A:UTH)
 
        res.redirect('/');//neu nhap dung thi ve trang chu
    } else {
        res.redirect('/login');//neu nhap sai pass thi no route lai ve login
    }
})
router.get('/', async(req, res) => {
    // console.log(req.user.name)
    //console.log(req.query.id) // id của bài báo ở đây :DD, ngấ, chứa ?ok k hmm đang suy nghĩ :)
    const data = await Post.find();
    //console.log(data)
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        check1 = true
        res.render("index", {
            check1,
            data,
            user: req.user
        })
    } else {
        check1 = false
        res.render("index", {
            check1,
            data
        })
    }

})
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/');

})
router.get('/read', async(req, res) => {
    //res.sendFile(`${__dirname}/login.html`);
    const id = req.query.id
    check = true
    //const dataArr = method.readData(path.join(__dirname, "../database/data_detail.json"));
    
    const post = await Post.findById(id);
    console.log(post)
    if (post == null) {
        check = false
    }
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        check1 = true
    } else {
        check1 = false
    }
   // console.log(id)
    res.render("read", {
        post,
        check1,
        checkExist: check

    })
})


router.get('/profile', async (req, res) => {
    if (req.isAuthenticated()) {
        const ID = req.query.id
        const user = await Users.findById(ID)
        res.cookie("ClientID", ID)
        res.render("profile", {
            user: user,
            logged: true
        })
    }
    else {
        res.cookie("ClientID", null)//chac ok r do 
        res.render("profile", {
            list: null,
            logged: false
        })
    }
})// cai log in no doc file json ko doc database
router.post('/register', async (req, res) => { // tạo tk// t nho co cai lenh popup
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    return res.redirect("/login") // còn gì nữa ko cu // di chet di :VV làm cáhc nào để lấy bụi ra khỏi khe điện thoại đây >
    //con alcohol bụi ở khe mà :) đổ cồn vào ăn lol à khe naokhe màn hình :( nó đóng ở trỏng khe loa ha) refactor code đi dm nhìn nhơ cái ổ gà v/ok nice
})

router.post('/profile/edit', async (req, res) => {
    const id = req.cookies.ClientID
    const user = await Users.findById(id);
    user.name = req.body.name,
        user.email = req.body.email,
        user.password = req.body.password//t meo nghi toi cach edit nay lun
    await user.save()
    return res.redirect("/")
})

router.get('/manage', async(req, res) => {
   
    if (req.isAuthenticated()) {
        const ID = req.query.id
        const user = await Users.findById(ID)
        res.cookie("ClientID", ID)
        res.render("managenews", {
            user: user,
            logged: true
        })
    }
    else {
        res.cookie("ClientID", null)//chac ok r do 
        res.render("managenews", {
           // news: null,
            logged: false
        })
    }

})

router.post('/addnews', async (req, res) => { // tạo tk// t nho co cai lenh popup
    const post = new Post({
        title: req.body.title,
        img: req.body.img,
        genre: req.body.genre,
        description: req.body.description,
        content: req.body.content,
        Users: req.body.Users
        
    })
    await post.save()
    //return res.redirect("/login") // còn gì nữa ko cu // di chet di :VV làm cáhc nào để lấy bụi ra khỏi khe điện thoại đây >
    //con alcohol bụi ở khe mà :) đổ cồn vào ăn lol à khe naokhe màn hình :( nó đóng ở trỏng khe loa ha) refactor code đi dm nhìn nhơ cái ổ gà v/ok nice
})

router.get('/news', async (req, res) => {
    console.log(req.query.name);
    res.render('news');
});

router.post('/news', async (req, res) => {
    console.log(req.body);
    res.send('news');
});


module.exports = router;