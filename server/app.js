let express = require("express")
let cors = require("cors")
let mongoose = require("mongoose")

let config = require("./config/default.json")

let api = require("./router/api.js")

let app = express()

app.use(
    cors({
        //origin,
        preflightContinue: false,
    })
)

app.use(express.json())

app.use("/api", api)

let { mongoUrl } = config

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(mongoUrl, options, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("success")
        /**监听http请求 */
        app.listen(config.port)
    }
})
