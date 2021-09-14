let Router = require("express")
let config = require("#root/config/default.json")

let router = Router()

//目标粉丝数

router.get("/get", (req, res) => {
    const { tips } = config
    res.json({
        code: 20000,
        data: { tips },
    })
})

module.exports = router
