var express = require("express");
var router  = express.Router();
var Sewa = require("../models/sewaEvent");
var expressSanitizer = require("express-sanitizer");
var middleware = require("../middleware");
bodyParser  = require("body-parser"),
// var { isLoggedIn, checkUserCampground, checkUserComment, isAdmin, isSafe } = middleware; // destructuring assignment


router.use(expressSanitizer());
// router.use(bodyParser.urlencoded({extended: true}));

// Show the default sewa events page 
router.get("/", function(req, res){
    var perPage = 5;
    var page = req.params.page || 1 
    // https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html
    Sewa
    .find({})
    .skip((perPage*page)- perPage)
    .limit(perPage)
    .exec(function(err, SewaEvents){
        Sewa.count().exec(function(err, count){
            if(err){
                console.log(err);
            }
            else{
                res.render("sewaEvent/index",{ 
                    SewaEvents: SewaEvents,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            }
        })
    })
});

// router to new event page 
router.get("/new", function(req, res){
    res.render("sewaEvent/new");
});



// Show the detail page for that particular event
router.get("/:id", function(req,res){
    Sewa.findById(req.params.id, function(err, foundSewa){
        if(err){
            console.log(err);
        }
        else{
            res.render("sewaEvent/show", {sewa: foundSewa});
        }
    })
});


// post data for new event page 
router.post("/",function(req, res){
    req.body.Sewa.description = req.sanitize(req.body.Sewa.description);
    Sewa.create(req.body.Sewa, function(err, redirectToSewaEvents){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/sewaEvents");
        }
    })
});

router.put("/:id", function(req, res){
    Sewa.findById(req.params.id, function(err, FoundSewaEvent){
        if(err){console.log(err)}
        else{
         FoundSewaEvent.VolunteerReceived++;
         console.log("IterateVolunteerEvent is:"+FoundSewaEvent.VolunteerReceived);
         Sewa.findByIdAndUpdate(req.params.id, FoundSewaEvent, function(err, updatedVolunteerReceived){
            if(err){
                console.log(err);
            } else{
                res.redirect("/sewaEvents");
            }
        })
        }
    })

});

router.put("/:id/edit", function(req, res){
    Sewa.findByIdAndUpdate(req.params.id, req.body.Sewa, function(err, updatedSewaEvent){
        if(err){
            console.log("err");
        } else{
            res.redirect("/sewaEvents");
        }
    }) 
});


module.exports = router;
