let Router = require("express")

let remote = require("./remote/index.js")
let local = require("./local/index.js")

let router = Router()

router.use("/remote", remote)
router.use("/local", local)

module.exports = router
