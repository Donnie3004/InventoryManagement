
import userModel from '../Models/userModel.js';

export default class UserController {
  getRegister(req, res) {
    return res.render('register', { titleEJS: 'Inventory Management - Register' });
  }
  registerUser(req, res) {
    const {name, email, password} = req.body; 

    let user = userModel.getUserFromEmail(email);
    if(user){
      return res.render('error', { titleEJS: 'Inventory Management - Error', ErrorMsg: 'Email already exists' });
    }

    const userCreated = userModel.createUser({name, email, password});
    console.log(userCreated);
    if(userCreated){
      return res.redirect('/');
    }
  }

  loginUser(req, res){
    if(req.user){
      return res.redirect('/'); // if user is already logged in then redirect to home page
    }
    res.render('login', { titleEJS: 'Inventory Management' });
  }

  postLoginUser(req, res){
    const {email, password} = req.body; 
    console.log("email... : ", email);
    if(!email ){
      return res.render('error', { titleEJS: 'Inventory Management - Error', ErrorMsg: 'Email is not valid' });
    }

    let user = userModel.getUserFromEmail(email);
    console.log("user... : ", user);
    if(!user){
      return res.render('error', { titleEJS: 'Inventory Management - Error', ErrorMsg: 'Email not registered' });
    }

    if(user.password !== password){
      return res.render('error', { titleEJS: 'Inventory Management - Error', ErrorMsg: 'Password is not valid' });
    }
    // if everything is fine then set the cookie
    console.log("user password : ", user.password);
    console.log("here........................");
    res.cookie('user_email', user.email, {maxAge: 1000*60*60*24}); // 1 day expiry
    console.log("cookie set : ", user.email);
    return res.redirect('/'); // redirect to home page
  }
}