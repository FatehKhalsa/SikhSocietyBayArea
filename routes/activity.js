var express = require("express");
var router  = express.Router();
var Activity = require("../models/activitiesEvent");
var expressSanitizer = require("express-sanitizer");
var middleware = require("../middleware");
var { isLoggedIn, checkUserCampground, checkUserComment, isAdmin, isSafe } = middleware; // destructuring assignment


router.use(expressSanitizer());


// Show the default sewa events page 
router.get("/", function(req, res){
    Activity.find({}, function(err, ActivityEvents){
        if(err){
            console.log(err);
        }
        else{
            res.render("activityEvent/index", {ActivityEvents: ActivityEvents});
        }
    });
});

// router to new event page 
router.get("/new", function(req, res){
    res.render("activityEvent/new");
});

// Show the detail page for that particular event
router.get("/:id", function(req,res){
    Activity.findById(req.params.id, function(err, foundActivity){
        if(err){
            console.log(err);
        }
        else{
            res.render("activityEvent/show", {Activity: foundActivity});
        }
    })
});

module.exports = router;
