let express = require("express")
let cors = require("cors")
let mongoose = require("mongoose")

let config = require("./config/default.json")

let remote = require("./router/remote/index.js")
let local = require("./router/local/index.js")

let app = express()

app.use(
    cors({
        //origin,
        preflightContinue: false,
    })
)

app.use(express.json())

app.use("/remote", remote)
app.use("/local", local)

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
