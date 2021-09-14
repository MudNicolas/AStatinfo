let Router = require("express")
let request = require("request")
let remote_config = require("#root/config/remote_config.json")
let router = Router()

/**
 * @param req.query.name
 */
router.get("/fans/realtime", (req, res) => {
	let { tuid } = req
	let option = {
		url: remote_config.info + tuid,
		headers: {
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4613.0 Safari/537.36 Edg/95.0.1000.0",
		},
	}
	request.get(option, (err, response, body) => {
		if (err) {
			return res.json({
				message: "远程服务器错误",
			})
		}
		if (response.statusCode !== 200) {
			return res.json({
				message: "服务器状态错误",
			})
		}
		let { follower } = JSON.parse(body).data
		return res.json({
			code: 20000,
			data: { follower },
		})
	})
})

module.exports = router
