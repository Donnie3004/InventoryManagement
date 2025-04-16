export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  static getUserFromEmail(_email){
    for(let i=0;i<users.length;i++){
      if(users[i].email === _email){
        return users[i];
      }
    }
    return null;
  }

  static createUser(userObj){
    let newUser = new UserModel(users.length + 1, userObj.name, userObj.email, userObj.password);
    users.push(newUser);
    return true;
  }
}



const users = [
  new UserModel(1, 'dummy', 'dummy@gmail.com', 'dummy123')
];