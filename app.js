var mongoose        = require("mongoose"),
    express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    passportLocal   = require("passport-local"),
    User            = require("./models/user");

var authRoutes      = require("./routes/auth"),
    adminAuthRoutes = require("./routes/adminAuth") ;
    
mongoose.connect("mongodb://localhost/users",{useNewUrlParser: true});
//mongoose.connect("mongodb://localhost/admin",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
//app.use(express.static("public"));

//Authentication
app.use(require("express-session")({
    secret: "valhalla",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new passportLocal(User.authenticate()));
//


app.use(authRoutes);
app.use(adminAuthRoutes);

app.listen(3000,function(){
    console.log("SERVER STARTED!!");
});
