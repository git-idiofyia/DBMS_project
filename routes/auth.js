var express         = require("express"),
    passport        = require("passport"),
    User            = require("../models/user"),
    Response        = require("../models/response"),
    Problem         = require("../models/complaint"),
    router          = express.Router();
   
    router.get("/",function(req,res){
        res.render("home");
    });   

    router.get("/register",function(req,res){
        res.render("signup");
    });
    
    router.post("/register",function(req,res){
        User.register(new User({username: req.body.username}),
             req.body.password,function(e,user){
                if(e){
                        console.log(e);
                        return res.render("signup");
                      }else{
                        passport.authenticate("local")( req,res,function(){
                        res.redirect("/profile");
                      });
                }
            });
    });

    router.get("/login",function(req,res){
        res.render("login");
    });

    
    router.post("/login",passport.authenticate("local",{
        successReturnToOrRedirect : "/profile",
        faliureRedirect : "/login"
    }),function(req,res){
       // delete req.session.returnTo;
    });

    router.get("/profile",isLoggedIn,function(req,res){
        res.render("chooseadmin");
    });

    router.post("/profile",isLoggedIn,function(req,res){
        Problem.find({adminname:req.body.adminname},function(e,problem){
            if(e) console.log(e);
            else
                {
                    res.render("gallery",{problem:problem});
                }
        });
    });
    
    router.post("/gallery",isLoggedIn,function(req,res){
        var response= [{
                        username: req.body.username,
                        response1: req.body.response1,
                        response2: req.body.response2,
                        response3: req.body.response3
                      }]
        Response.create(response,function(e,response){
            if(e) console.log(e);
            else
                  res.redirect("/");
        });
    });

    router.get("/signout",function(req,res){
        req.logout();
        res.redirect("/");
    });



//MiddleWare
function isLoggedIn(req,res,next){
    
   // req.session.returnTo = req.originalUrl;
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

