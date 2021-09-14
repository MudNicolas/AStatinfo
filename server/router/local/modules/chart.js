let Router = require("express")
let dayjs = require("dayjs")
let config = require("#root/config/default.json")
let { forecastDayRange } = config

let router = Router()

let Follower = require("#model/Follower.js")

router.get("/", (req, res) => {
    let { name, timeRange } = req.query
    if (!verify(timeRange)) {
        res
    }
})

function verify(timeRnage) {
    if (Array.isArray(timeRnage)) {
        //formattime
        if (
            timeRnage[0] &&
            timeRnage[1] &&
            new Date(timeRnage[0]).toString() !== "Invalid Date" &&
            new Date(timeRnage[1]).toString() !== "Invalid Date"
        )
            return true
        return false
    }
}

module.exports = router
