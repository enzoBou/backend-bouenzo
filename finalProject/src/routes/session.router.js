import Router from 'express'
import UserController from '../controller/user.controller.js'
import handlePolicies from '../middleware/handle-policies.middleware.js'
import userModel from '../dao/models/index.js'
import createHashValue from '../utils/encrypt.js'
import isValidPassword from '../utils/encrypt.js'
import generateJWT from '../utils/jwt.js'

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err)
      return res.status(500).json({ message: `error internal, logout` });
    return res.send({ message: `logout Error`, body: err });
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.json({ message: `este usuario no esta registrado` });
    }
    const isValidComparePsw = await isValidPassword(password, findUser.password);
    if (!isValidComparePsw) {
      return res.status(401).json({ message: `credenciales invalidas` });
    }

    const signUser = {
      email,
      role: findUser.role,
      id: findUser._id,
    };

    const token = await generateJWT({ ...signUser });

    req.session.user = {
      ...signUser,
    };

    return res.json({ message: `welcome $${email},login success`, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("BODY ****", req.body);
    const { first_name, last_name, email, age, password, role } = req.body;

    const pswHashed = await createHashValue(password);

    const userAdd = {
      email,
      password,
      first_name,
      last_name,
      age,
      password: pswHashed,
      role,
    };
    const newUser = await userModel.create(userAdd);

    req.session.user = { email, role, id: newUser._id };

    return res.json({
      message: `usuario creado`,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: `${error}` });
  }
});

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