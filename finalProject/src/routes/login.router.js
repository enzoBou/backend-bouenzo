const { Router } = require("express");
const passport = require("passport");
const userModel = require("../dao/models/user.model");
const { createHashValue, isValidPassword } = require("../utils/encrypt");

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/api/login");
    return res.send({ message: `logout Error`, body: err });
  });
});

router.post("/login", async (req, res) => {
  	try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: `este usuario no esta registrado` });
    }
    const isValidComparePsw = await isValidPassword(password, findUser.password);
    if (!isValidComparePsw) {
      return res.json({ message: `password incorrecto` });
    }

    req.session.user = {
      ...findUser,
    };

    return res.render("profile", {
      username: req.session?.user?.username || findUser.username,
      email: req.session?.user?.email || email,
      rol: req.session?.user?.rol || findUser.rol,
    });
  	} catch (error) {
}});

router.post("/register", async (req, res) => {
  	try {
    const { username, email, password, rol } = req.body;
    const pswHashed = await createHashValue(password);
    const userAdd = {
		username,
		email,
		rol,
    password: pswHashed,
    };
    const newUser = await userModel.create(userAdd);
    req.session.user = { username, email, password, rol };
    return res.render(`login`);
  	} catch (error) {
}});

router.post("/update", async (req, res) => {
  try {
    console.log("BODY UPDATE****", req.body);
    const { new_password, email } = req.body;
    const newPswHashed = await createHashValue(new_password);
    const user = await userModel.findOne({ email });
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPswHashed,
    });
    if (!updateUser) {
      res.json({ message: "problemas actualizando la contrasena" });
    }
    return res.render(`login`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/github",passport.authenticate("github", { scope: ["user:email"] }),async (req, res) => {

});

router.get("/api/github/callback",passport.authenticate("github", { failureRedirect: "/api/login" }),
async (req, res) => {
  try {
    req.session.user = req.user;
    res.redirect("/api/profile");
  } catch (error) {
    console.log(error);
  }
  }
);

module.exports = router;