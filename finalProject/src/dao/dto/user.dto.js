export default class UserDTO {
    constructor(id, firstName, lastName, email, age, password, role, cart) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.age = age;
      this.password = password;
      this.role = role;
      this.cart = cart;
    }
  
    static toDTO(user) {
      const { _id, first_name, last_name, email, age, password, role, cart } = user;
      return new UserDTO(_id, first_name, last_name, email, age, password, role, cart);
    }
}

  