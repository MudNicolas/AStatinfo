let Router = require("express")

let forecast = require("./modules/forecast.js")

let router = Router()

router.use("/forecast", forecast)

module.exports = router
