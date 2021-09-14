let Router = require("express")
let dayjs = require("dayjs")
let config = require("#root/config/default.json")
let { maxChartDataLength } = config

let router = Router()

let Follower = require("#model/Follower.js")

router.get("/", (req, res) => {
	let { name, timeRange } = req.query
	if (!verify(timeRange)) {
		return res.json({
			message: "输入错误"
		})
	}
	let fromTime = new Date(timeRange[0])
	let toTime = new Date(timeRange[1])
	Follower.find({
		name,
		time: {
			$gte: fromTime,
			$lte: toTime,
		},
	}).then(list => {
		let chatData = []
		//小于最多显示限制，全部返回
		if (list.length <= maxChartDataLength) {
			chatData = list.map(e => {
				return {
					numberFollowers: e.numberFollowers,
					time: e.time
				}
			})
		}
		//大于最多显示限制，平均取限制数个返回
		else {
			let listLength = list.length
			let indexArray = []
			indexArray[0] = 0, indexArray[maxChartDataLength - 1] = listLength - 1
			let step = (listLength - 1) / (maxChartDataLength - 1)
			for (let i = 1; i < maxChartDataLength - 1; i++) {
				indexArray[i] = Math.round(indexArray[i - 1] + step)
			}
			chatData = indexArray.map(i => {
				return {
					numberFollowers: list[i].numberFollowers,
					time: list[i].time
				}
			})


		}
		res.json({
			code: 20000,
			data: { chatData }
		})
	})

})

function verify(timeRange) {
	if (Array.isArray(timeRange)) {
		//formattime
		if (
			timeRange[0] &&
			timeRange[1] &&
			new Date(timeRange[0]).toString() !== "Invalid Date" &&
			new Date(timeRange[1]).toString() !== "Invalid Date" &&
			new Date(timeRange[0]) < new Date(timeRange[1])
		) { return true }
		return false
	}
}

module.exports = router
