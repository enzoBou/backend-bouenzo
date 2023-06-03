import Router from 'express'
import UserController from '../controller/user.controller.js'
import handlePolicies from '../middleware/handle-policies.middleware.js'

const router = Router();

router.get("/logout", UserController.logoutUser);
router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

router.get("/current", handlePolicies(["PUBLIC"]), async (req, res) => {
  const usersDTO = req.user.map(user => usersDTO.toDTO(user));
  return res.json(usersDTO);
});

router.get("/current/admin", handlePolicies(["ADMIN"]), async (req, res) => {
  return res.json({ message: `jwt en las los headers siendo ADMIN` });
});

router.get("/current/user", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
    return res.json({ message: `jwt en las los headers` });
  }
);

export default router;