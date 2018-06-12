var express = require("express");
var router  = express.Router({mergeParams: true});
var sewa = require("../models/sewaEvent");
var Kirtan = require("../models/kirtanEvent");
var Comment = require("../models/comments");
var middleware = require("../middleware");
const { isLoggedIn, checkUserComment } = middleware;


//Comments New
router.get("/new", function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

   //lookup campground using ID
//    switch(Entity){
//        case 'SewEvent': // look up sewaEvent and associate comment with it
//                         break;
//        case 'ActivityEvent': // look up Activity Event and associate comment with it
//                         break;
//        case 'Kirtanevent': // look up KirtanEvent and associated comment with it 
//                         break;
//         default: console.log('Not able to find any assocaited entity');
//    }
//Comments Create
router.post("/", isLoggedIn, function(req, res){
    //lookup campground using ID
    sewa.findById(req.params.id, function(err, sewa){
        if(err){
            console.log(err);
            res.redirect("/sewaEvents");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comment
                comment.save();
                sewa.comments.push(comment);
                sewa.save();
                console.log(comment);
                req.flash('success', 'Created a comment!');
                // res.redirect('/sewaEvents/' + sewa._id);
            }
         });
        }
    });
 });

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

module.exports = router;