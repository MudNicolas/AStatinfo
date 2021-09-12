let mongoose = require("mongoose")

let followerSchemas = new mongoose.Schema({
    name: String,
    time: Date,
    numberFollowers: Number,
})

export default mongoose.model("Follower", followerSchemas)
