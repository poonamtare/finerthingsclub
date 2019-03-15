var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Book            = require("./models/book"),
    Comment         = require("./models/comment"),
    seedDB          =  require("./seeds"),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local");

//REQUIRING ROUTES
var commentRoutes = require("./routes/comments"),
    bookRoutes    = require("./routes/books"),
    indexRoutes    = require("./routes/index");

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:" I think that 1984 is the best book ever written",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//seedDB();// seed the database
// var books = [
//      {
//          name: "A Room With a View",
//          image:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/A_Room_with_a_View.jpg/220px-A_Room_with_a_View.jpg"
         
//      }, 
//      {
//          name: "Memoirs of a Geisha",
//          image:"https://images.gr-assets.com/books/1409595968l/929.jpg"
         
//      },
//      {
//          name: "Angela's Ashes",
//          image:"https://upload.wikimedia.org/wikipedia/en/0/0c/AngelasAshes.jpg"
//      }
//     ];

mongoose.connect("mongodb://localhost:27017/finer_things", { useNewUrlParser: true });   
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/books/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The FTC server has started!!...");
});