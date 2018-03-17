var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
methodOverride = require("method-override"),
sewa            = require("./models/sewaEvent"),
kirtan          = require("./models/kirtanEvent"),
activites       = require("./models/activitiesEvent"),
User            = require("./models/user"),
methodOverride  = require("method-override"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
flash       = require("connect-flash");



// configure dotenv
require('dotenv').load();


// routes
var indexRoutes      = require("./routes/index"),
    sewaRoutes       = require("./routes/sewa"),
    kirtanRoutes     = require("./routes/kirtan"),
    activityRoutes         = require("./routes/activity")
    // commentsRoutes   = require("./routes/comments")

// PASSPORT CONFIGURATION

    
mongoose.connect("mongodb://localhost/sikh_society_bayarea");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());


// sewa.create({
//     sewaName: 'Langar for Homeless',
//     description: 'Please join us in for the annual Kirtan Samagan Program, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//     location: '300 Gurdwara Rd, Fremont, CA',
//     image: "Http://www.sevafoodbank.com/wp-content/uploads/2015/10/langar-seva.jpg",
//     itemsNeeded: "Sugar",
//     VolunteerNeeded: 5,
//     VolunteerReceived: 5 
// });

// kirtan.create({
//     kirtanName: 'Rehn Sabai Event',
//     description: 'With Wahegurus grace, this event will continue through out the night till amrit vela',
//     location: 'Fremont Gurdwara Sahib. ',
// });

// activites.create({
//     activityName: 'Wilderness Camp',
//     description: 'This is a sikh recreation camp in yosemite valley',
//     location: 'Yosemite National Park, Yosemite',
//     lat: 45,
//     lng: 300
// });



//require moment
app.locals.moment = require('moment');

// // PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 });


app.use("/", indexRoutes);
app.use("/sewaEvents", sewaRoutes);
app.use("/kirtanEvents", kirtanRoutes);
app.use("/activityEvent", activityRoutes);

app.listen(3000, function(){
    console.log("The Bay Area Sikh Society Server Has Started!");
 });