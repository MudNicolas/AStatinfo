let request = require("request")
let config = require("./config/remote_config.json")
let schedule = require("node-schedule")
let mongoose = require("mongoose")
let Follower = require("./model/Follower.js")

function timer() {
    let rule = new schedule.RecurrenceRule()
    rule.minute = [0, 10, 20, 30, 40, 50]
    schedule.scheduleJob(rule, spider)
}

function spider() {
    let { query } = config
    query.forEach(e => {
        let option = {
            url: config.info + e.uid,
            headers: {
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4613.0 Safari/537.36 Edg/95.0.1000.0",
            },
        }

        request.get(option, (err, response, body) => {
            let { follower } = JSON.parse(body).data

            new Follower({
                name: e.name,
                time: new Date(),
                numberFollowers: follower,
            }).save(err => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(new Date(), " done")
            })
        })
    })
}

let mongoUrl = "mongodb://localhost:27999/AStatinfo"
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(mongoUrl, options, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("success")
        timer()
    }
})
