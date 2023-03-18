const {Router} = require ('express')
const router = Router()

router.get("/", (req,res) => {
    res.json({cookie: req.cookies})
    res.render('/cookie')
});

router.post("/create", async (req,res) => {
    res.cookie("cookieUser", {user: `${req.body.email}`}, {maxAge:100000})
    .send()
})

module.exports = router;