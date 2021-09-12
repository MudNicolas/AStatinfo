let request = require("request")
let config = require("./config.json")
let schedule = require("node-schedule")
let Follower = require("./model/Follower.js")

var timer = new schedule.RecurrenceRule()
timer.minute = [0, 10, 20, 30, 40, 50]
schedule.scheduleJob(timer, spider)

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
            }).save(err, r => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(r.name, " ", r.time)
            })
        })
    })
}
