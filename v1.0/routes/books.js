var express = require("express");
var router = express.Router();
var Book    = require("../models/book");

//INDEX ROUTE - Show all books
router.get("/", function(req, res){
   Book.find({}, function(err, allBooks){
       if(err){
           console.log(err);
       } else{
           res.render("books/index",{books: allBooks});
       }
   }); 
});

//CREATE route - add new book to DB
router.post("/", isLoggedIn,function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    };
    var newBook = {name: name, image: image, description: desc, author: author};
    // create new book and save to database 
    Book.create(newBook, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to books page
            console.log(newlyCreated);
            res.redirect("/books"); 
        }
    });
});

//NEW route - Show form to create new book entry 
router.get("/new", isLoggedIn,function(req, res) {
   res.render("books/new"); 
});

//SHOW route
router.get("/:id", function(req, res) {
    // Find book with provided id
    //using method given by mongoose findById
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            console.log(foundBook);
           //render show template with that book
           res.render("books/show", {book : foundBook}); 
        }
    });
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;