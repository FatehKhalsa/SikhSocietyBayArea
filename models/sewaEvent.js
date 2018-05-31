var mongoose = require("mongoose");

var sewaEventSchema = new mongoose.Schema({
    sewaName: String,
    description: String,
    image: String,
    itemsNeeded: String,
    VolunteerNeeded: Number, 
    VolunteerReceived: Number,
    PrivateEvent: String,
    PublicEvent: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("SewaEvent", sewaEventSchema);