import express from 'express';
import path from 'path';

// import {fileURLToPath} from 'url';
import expressEjsLayouts from 'express-ejs-layouts';
import ProductController from './src/Controllers/productController.js';
import uploadFile from './src/middleware/uploadFile.js';
import cookieParser from 'cookie-parser';
import UserController from './src/Controllers/userController.js';
import UserModel from './src/Models/userModel.js';

const PORT = 8001;
const server = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// When form is submitted these 2 are used to get data in string and JSON format;
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(expressEjsLayouts);
server.set('layout', 'layout');
server.use(cookieParser()); // cookies will be in header of req.cookies

// console.log(__dirname);
// console.log(path.join(__dirname, "public"));
// server.use(express.static(path.join(__dirname, "public")))

server.use(express.static('public'));


server.use((req, res, next)=>{
  if(req.cookies.user_email){
    let user = UserModel.getUserFromEmail(req.cookies.user_email);
    req.user = user; // to access user in all the routes
    console.log("user here ..xx : ", req.user);
  }else{
    req.user = null;
  }
  next();
});

// These are the view engines to render the views (i.e html/ejs files)
server.set('view engine', "ejs");
server.set('views', path.join(path.resolve(), 'src', 'views'));

const productController = new ProductController();
server.get('/', productController.getAllProducts);
server.get('/Add-product', productController.addNewProduct);
server.post('/Add-product-save', uploadFile.single('ImageURL'), productController.addNewProductSave);
server.get('/product-edit', productController.getProductByID);
server.post('/Edit-product-save', uploadFile.single('ImageURL'), productController.editProductSave);
server.delete('/delete-product/:id', productController.deleteProduct);

server.get('/test', (req, res)=>{
  console.log("Cookies: ", req.cookies);  
  res.cookie("name", "arbaz",{maxAge:1000*60});
  //res.clearCookie("name"); to clear the cookie having name 
  return res.send("ok");
});

const userController = new UserController();
server.get('/user/register', userController.getRegister);
server.post('/user-register', userController.registerUser);
server.get('/user/login', userController.loginUser);
server.post('/user/login', userController.postLoginUser);

server.listen(PORT, (err)=>{
  if(err){
    console.error(err);
    return;
  }
  console.log(`Server started at PORT - ${PORT}`);
})