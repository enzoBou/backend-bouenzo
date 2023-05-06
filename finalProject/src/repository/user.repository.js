import userModel from '../dao/models/user.model.js'

export default class UserRepository {

  async getAll() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error('Error al obtener los usuarios');
    }
  }

  async create(userData) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  }
}

