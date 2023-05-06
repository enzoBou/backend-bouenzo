import { Router } from "express";
import checkAuthJwt from '../middleware/auth.middleware.js'

const router = Router();

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/recover", async (req, res) => {
  res.render("recover");
});

router.get("/profile", checkAuthJwt, async (req, res) => {
  const user = req.session.user;
  res.render("profile", {
    username: user.username,
    rol: user.rol,
    email: user.email,
  });
});

export default router;