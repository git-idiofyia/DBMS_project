var express         = require("express"),
    passport        = require("passport"),
    User            = require("../models/user"),
    Problem         = require("../models/complaint"),
    adminRouter     = express.Router();

    adminRouter.get("/",function(req,res){
        res.render("home");
    });
    
    adminRouter.get("/admin/signup",function(req,res){
        res.render("admin/signup");
    });

    
    adminRouter.post("/admin/signup",function(req,res){
        User.register(new User({username: req.body.username}),
             req.body.password,function(e,user){
                if(e){
                        console.log(e);
                        return res.render("admin/signup");
                      }else{
                        passport.authenticate("local")( req,res,function(){
                        res.redirect("/admin/setproblem");
                      });
                }
            });
    });

    adminRouter.get("/admin/login",function(req,res){
        res.render("admin/login");
    });

    
    adminRouter.post("/admin/login",passport.authenticate("local",{
        successReturnToOrRedirect : "/admin/setproblem",
        faliureRedirect : "/admin/login"
    }),function(req,res){
       // delete req.session.returnTo;
    });

    adminRouter.get("/admin/setproblem",function(req,res){
        res.render("admin/setproblem");
    });

    adminRouter.post("/admin/setproblem",isLoggedIn,function(req,res){
            var prob = [{
                         adminname : req.body.name,
                         problem1  : req.body.problem1, //[{problem: req.body.problem1, option1: req.body.option11, option2: req.body.option21, option3: req.body.option31,option4:req.body.option41 }],
                         problem2  : req.body.problem2, //[{problem: req.body.problem2, option1: req.body.option12, option2: req.body.option22, option3: req.body.option32,option4:req.body.option42 }],
                         problem3  : req.body.problem3 //[{problem: req.body.problem3, option1: req.body.option13, option2: req.body.option23, option3: req.body.option33,option4:req.body.option43 }]                         
                       }]
            Problem.create(prob,function(e,prob){
                if(e)
                    {console.log(e);}
                else
                    {
                        res.redirect("/");
                        req.flash("PROBLEM SET!!");
                    }
            });
    });

    /*adminRouter.get("/admin/problem",isLoggedIn,function(req,res){
        Problem.find
        res.render("admin/problems",{problem:prob});
    });*/
 

    adminRouter.get("/admin/signout",function(req,res){
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
    res.redirect("/admin/login");
}

module.exports = adminRouter;

