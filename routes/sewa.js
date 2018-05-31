var express = require("express");
var router  = express.Router();
var Sewa = require("../models/sewaEvent");
var expressSanitizer = require("express-sanitizer");
var middleware = require("../middleware");
bodyParser  = require("body-parser");
var { isLoggedIn, isAdmin, isSafe } = middleware; // destructuring assignment


router.use(expressSanitizer());
// router.use(bodyParser.urlencoded({extended: true}));

// Show the default sewa events page 
router.get("/", function(req, res){
    var perPage = 5;
    var pageQuery = parseInt(req.query.page); 
  	var pageNumber = pageQuery ? pageQuery : 1;
    Sewa
    .find({})
    .skip((perPage*pageNumber)- perPage)
    .limit(perPage)
    .exec(function(err, SewaEvents){
        Sewa.count().exec(function(err, count){
            if(err){
                console.log(err);
            }
            else{
                res.render("sewaEvent/index",{ 
                    SewaEvents: SewaEvents,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        })
    })
});

// router to new event page 
router.get("/new", isLoggedIn, function(req, res){
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

// Update volunteer received
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

// Edit sewa Event 

router.get("/:id/edit", function(req, res){
    Sewa.findById(req.params.id, function(err, foundCampground){
        console.log(foundCampground);
        res.render("sewaEvent/edit", {SewaEvent: foundCampground});
    });
});

router.put("/:id/edit", function(req, res){
    console.log("Public Event value is:"+req.body.SewaEvent.PublicEvent);
    if(req.body.SewaEvent.PublicEvent==='on'){
        req.body.SewaEvent.PrivateEvent='off';
        console.log('Turning private event off')
    }
    // if(req.body.SewaEvent.PrivateEvent === 'on'){
    //     req.body.SewaEvent.PublicEvent === 'on' ? req.body.SewaEvent.PrivateEvent = 'off' : req.body.SewaEvent.PrivateEvent = 'off';
    //     console.log("HHEE");
    // }
    else{
        req.body.SewaEvent.PrivateEvent = 'on';
        console.log("Turning private event on");
    }
   
    Sewa.findByIdAndUpdate(req.params.id, req.body.SewaEvent, function(err, updatedSewaEvent){
        if(err){
            console.log("err");
        } else{
            console.log("Checkbox property is:"+req.body.SewaEvent);
            res.redirect("/sewaEvents");
        }
    }) 
});

// delete 

router.delete("/:id/delete", function(req, res){
    Sewa.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/sewaEvents");
            console.log("err");
        } else{
            res.redirect("/sewaEvents");

        }
    });
});


module.exports = router;
