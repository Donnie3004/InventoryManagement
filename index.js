import express from 'express';
import path from 'path';
import ProductController from './src/Controller/productController.js';

const PORT = 8001;
const server = express();

  // server.set('view engine', "ejs");
server.set('Views', path.join(path.resolve(), 'src', 'views', 'index.html'));

const productController = new ProductController();
server.get('/', productController.getAllProducts);

server.listen(PORT, (err)=>{
  if(err){
    console.error(err);
    return;
  }
  console.log(`Server started at PORT - ${PORT}`);
})