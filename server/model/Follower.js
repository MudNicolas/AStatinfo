let mongoose = require("mongoose")

let followerSchemas = new mongoose.Schema({
    name: String,
    time: Date,
    numberFollowers: Number,
})

module.exports = mongoose.model("Follower", followerSchemas)
