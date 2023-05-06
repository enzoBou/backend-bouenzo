import UserRepository from '../repository/user.repository.js'
import UserDTO from '../dao/dto/user.dto.js'

export default class UserController {

  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAll();
      res.json(users.map(user => UserDTO.toDTO(user)));
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserRepository.create(userData);
      res.status(201).json(UserDTO.toDTO(newUser));
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
}



