import UserRepository from '../repository/user.repository.js'
import UserDTO from '../dao/dto/user.dto.js'
import ErrorsHTTP from '../service/errors/error.handle.js';
import isValidPassword from '../utils/encrypt.js'
import generateJWT from '../utils/jwt.js'
import userModel from '../dao/models/index.js'
import createHashValue from '../utils/encrypt.js'

const httpResp = new ErrorsHTTP();

export default class UserController {

  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAll();
      res.json(users.map(user => UserDTO.toDTO(user)));
    } catch (error) {
      return httpResp.Error(res, 'Error al obtener los usuarios');
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserRepository.create(userData);
      return httpResp.Created(UserDTO.toDTO(newUser));
    } catch (error) {
      return httpResp.Error(res, 'Error al crear un usuario');
    }
  }

  async logoutUser(req, res) {
    try {
      req.session.destroy((err) => {
        if (!err)
          return res.status(500).json({ message: `error internal, logout` });
        return res.send({ message: `logout Error`, body: err });
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al cerrar sesion');
    }
  }

  async loginUser(req, res) {
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
  }

  async regiterUser(req, res) {
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
  }
};



