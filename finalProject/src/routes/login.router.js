const {Router} = require ('express')
const { find } = require("../dao/models/user.model");
const userModel = require("../dao/models/user.model");

const router = Router()

router.get("/logout", async (req,res) => {
    req.session.destroy((err) => {
        if(!err) return res.redirect("/views/login")
        return res.send({message: 'logout error', body: err})
    });
});

router.post("/login", async (req,res) => {
    try {
        const { email, password } = req.body;
        const session = req.session;
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return res.json({message: `este usuario no esta registrado`});
        }
        if (findUser.password !== password) {
            return res.json({message: `password incorrecto`});
        }
        req.session.user = {
            ...findUser,
        };
        return res.render("products");
    } catch (error) {
        console.log(error);
    }
});

router.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, age, password } = req.body;
      const userAdd = { email, password, first_name, last_name, age, password };
      const newUser = await userModel.create(userAdd);
  
      req.session.user = { email, first_name, last_name, age };
      return res.render(`login`);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;