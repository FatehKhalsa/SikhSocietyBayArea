var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/homepage", function(req, res){
    res.render("index");
});

router.get("/login", function(req, res){
    res.render("login", {page: 'login'}); 
 });
 
 //handling login logic
 router.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/campgrounds",
         failureRedirect: "/login",
         failureFlash: true,
         successFlash: 'Welcome to YelpCamp!'
     }), function(req, res){
 });
 
 // logout route
 router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/campgrounds");
 });
module.exports = router;