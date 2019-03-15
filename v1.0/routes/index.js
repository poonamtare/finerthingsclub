var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


// ROOT ROUTE
router.get("/", function(req,res){
    res.render("landing");
});

//REGISTER FORM ROUTE
router.get("/register",function(req, res) {
   res.render("register"); 
});

//This route will handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser,req.body.password,function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }   
        passport.authenticate("local")(req, res, function(){
            res.redirect("/books");
        });
   });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res) {
  res.render("login");  
});

// This route will handle sign in logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/books",
        failureRedirect:"/login"
    }), function(req, res) {
//this callback not needed
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/books");
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;