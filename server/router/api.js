let Router = require("express")

let remote = require("./remote/index.js")
let local = require("./local/index.js")

let remote_config = require("#root/config/remote_config.json")

let router = Router()

router.use((req, res, next) => {
	let { name } = req.query
	let { query } = remote_config
	let e = query.find(i => i.name === name)
	if (!e) {
		return res.json({
			message: "输入错误",
		})
	}
	req.tuid = e.uid
	next()
})

router.use("/remote", remote)
router.use("/local", local)

module.exports = router
