var mongoose = require("mongoose");

var kirtanEventSchema = new mongoose.Schema({
    kirtanName: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    PrivateEvent: String,
    PublicEvent: String,
    peopleGoing: Number,
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
    }
})

module.exports = mongoose.model("KirtanEvent", kirtanEventSchema);