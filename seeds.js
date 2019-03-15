var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment");

var data = [
    {
        name: "Gone with the wind",
        image:"https://images.unsplash.com/photo-1495573258723-2c7be7a646ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
    {
        name: "Cat's cradle",
        image:"https://images.unsplash.com/photo-1532304854-4248635f2cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
    {
        name: "And then there were none",
        image:"https://images.unsplash.com/photo-1532394000100-538b4505fc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    }
    
    ];

function seedDB(){
   
   //Removing all books
   Book.deleteMany({}, function(err, book){
      if (err){
          console.log(err);
      }  else{
            console.log("Database has been cleared!...");
                  //adding few books
            data.forEach(function(seed){
                Book.create(seed, function(err, book){
                  if(err){
                      console.log(err);
                  } else {
                      console.log("Added a Book");
                      //create a comment
                      Comment.create(
                          {
                              text: "Great book, but drags a bit in the middle",
                              author: "PT"
                      },function(err, comment){
                          if(err){
                              console.log(err);
                          } else{
                              book.comments.push(comment);
                              book.save(); 
                              console.log("created new comment.")
                          }
                           
                      });
                  }
                });
            });
            }
    }); 
    
    
    
}

module.exports = seedDB;