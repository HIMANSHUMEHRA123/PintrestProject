const express = require("express");
const router = express.Router();
const passport = require("passport");
const postModel = require("../models/post");
const userModel = require("../models/user")
const upload = require("./multer");
const path = require('path');

 

const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(userModel.authenticate()));


router.get('/' ,(req,res,next) => {
    res.render('index');
})
router.get('/login' ,(req,res,next) => {
   
    res.render('login',{error: req.flash('error')});
})
router.get('/profile', isLoggedIn, async (req,res,next) => {
    const user = await userModel.findOne({
        username: req.session.passport.user
    })
    .populate("posts")
     res.render("profile",{user});
})
router.get('/feed' ,(req,res,next) => {
    res.render('feed');
})
router.post('/upload' ,isLoggedIn,upload.single('file'), async (req,res,next) => {
    if(!req.file){
        return res.status(400),send("No were uploaded");
    }
    const user = await userModel.findOne({username: req.session.passport.user});
   const post =  await postModel.create({
        image: req.file.filename,
        posttext:req.body.filecaption,
        user: user._id
    })
   
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
})
 

router.post('/register' ,(req,res,) => { 
    console.log(req.body);
    let {fullname,email,username} = req.body;
    let user = new userModel({
        fullname,
        username,
        email
    });
    userModel.register(user, req.body.password)
    .then(function(){
        passport.authenticate("local")(req,res,function(){
            res.redirect("/profile");
        });
    });
});
router.post('/login' ,passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash: true
}),
(req,res,) => { 
});
router.get("/logout", (req, res, next) => {
     
    req.logout(function(err) {
        if (err) { 
            console.error('Logout error:', err);
            return next(err); 
        }
        res.redirect("/");
    });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');  
}

module.exports = router;