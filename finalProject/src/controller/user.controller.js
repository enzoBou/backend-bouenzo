import UserRepository from '../repository/user.repository.js'
import UserDTO from '../dao/dto/user.dto.js'
import { ErrorsHTTP, EnumErrors } from '../service/errors/error.handle.js';

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
};



