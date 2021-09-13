let Router = require("express")

let remote = require("./remote/index.js")
let local = require("./local/index.js")

let api_config = require("#root/config/api_config.json")

let router = Router()

router.use((req, res, next) => {
    let { name } = req.query
    let { query } = api_config
    let e = query.find(i => i.name === name)
    if (!e) {
        return res.status(404).end()
    }
    req.tuid = e.uid
    next()
})

router.use("/remote", remote)
router.use("/local", local)

module.exports = router
