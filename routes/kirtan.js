var express = require("express");
var router  = express.Router();
var Kirtan = require("../models/kirtanEvent");
var expressSanitizer = require("express-sanitizer");
var middleware = require("../middleware");

router.use(expressSanitizer());

// Show the default sewa events page 
router.get("/", function(req, res){
    Kirtan.find({}, function(err, KirtanEvents){
        if(err){
            console.log(err);
        }
        else{
            res.render("kirtanEvent/index", {KirtanEvents:KirtanEvents});
        }
    });
});

// router to new event page 
router.get("/new", function(req, res){
    res.render("kirtanEvent/new");
});

// Show the detail page for that particular event
router.get("/:id", function(req,res){
    Kirtan.findById(req.params.id, function(err, foundSewa){
        if(err){
            console.log(err);
        }
        else{
            res.render("kirtanEvent/show", {kirtan: foundSewa});
        }
    })
});

// post data for new event page 
router.post("/", function(req, res){
    req.body.Kirtan.description = req.sanitize(req.body.Kirtan.description);
    Kirtan.create(req.body.Kirtan, function(err, redirectToKirtanEvents){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/kirtanEvents");
        }
    })
});

// edit the kirtan event
router.get("/:id/edit", function(req, res){
    Kirtan.findById(req.params.id, function(err, foundCampground){
        res.render("kirtanEvent/edit", {Kirtan: foundCampground});
    });
});

router.put("/:id/edit", function(req, res){
    Kirtan.findByIdAndUpdate(req.params.id, req.body.Kirtan, function(err, updatedKirtanEvent){
        if(err){
            console.log("err");
        } else{
            res.redirect("/kirtanEvents");
        }
    }) 
});

module.exports = router;