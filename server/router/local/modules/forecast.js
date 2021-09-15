let Router = require("express")
let dayjs = require("dayjs")
let config = require("#root/config/default.json")
let { forecastDayRange } = config

let router = Router()

let Follower = require("#model/Follower.js")

const { math } = require("meeko")

//目标粉丝数
const targetFansNumberArray = [50 * 10000, 100 * 10000, 70 * 10000 * 10000]

router.get("/", (req, res) => {
    let { name } = req.query
    let dateNow = dayjs().toDate()

    let dateFrom = dayjs().add(-forecastDayRange, "day").toDate()
    Follower.find({
        name,
        time: {
            $gte: dateFrom,
            $lte: dateNow,
        },
    })
        .sort({ time: 1 })
        .select("numberFollowers")
        .then((data, err) => {
            if (err) {
                return res.json({
                    message: "服务器错误",
                })
            }
            let linearDataY = data.map(e => {
                return e.numberFollowers
            })
            let linearDataX = linearDataY.map((e, index) => {
                return index
            })
            let { a: k, b,r } = math.linearFitting(linearDataX, linearDataY)
            if (r<0.95){
                console.log("r=",r)
            }
           
            let result = targetFansNumberArray.map(e => {
                let step = (e - b) / k
                const TIME_INTERVAL = 10
                let totalMinute = step * TIME_INTERVAL
                return {
                    number: e,
                    forecast: dayjs().add(totalMinute, "minute").toDate(),
                }
            })
            res.json({
                code: 20000,
                data: { result },
            })
        })
})

module.exports = router
