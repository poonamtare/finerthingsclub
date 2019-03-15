var express = require("express");
var router  = express.Router({mergeParams: true});
var Book    = require("../models/book");    
var Comment = require("../models/comment"); 
    
//COMMENTS NEW
router.get("/new",isLoggedIn, function(req, res) {
    //find book by id
    Book.findById(req.params.id, function(err,book){
       if(err){
           console.log(err);
       } else {
         res.render("comments/new", {book: book});  
       }
    });
});

//COMMENTS CREATE
router.post("/",isLoggedIn, function(req, res){
 // lookup book using id
 Book.findById(req.params.id, function(err, book) {
     if(err){
         console.log(err);
         res.redirect("/books");
     } else {
         //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    book.comments.push(comment);
                    book.save();
                    console.log(comment);
                    res.redirect("/books/"+ book._id);
                }
            });
    }
 });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;