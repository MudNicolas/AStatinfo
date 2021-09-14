let Router = require("express")

let forecast = require("./modules/forecast.js")
let chart = require("./modules/chart.js")

let router = Router()

router.use("/forecast", forecast)
router.use("/chart", chart)

module.exports = router
