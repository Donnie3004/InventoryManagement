import path from 'path';
import validator from 'validator';
import productModel from '../Models/productsModel.js';

// export function getAllProducts(req, res){
//   res.sendFile(path.join(path.resolve(), 'src', 'Views', 'products.html'));
// }


export default class productController{

  // To get products -- R --
  getAllProducts(req, res){
    // res.sendFile(path.join(path.resolve(), 'src', 'views', 'productsMain.ejs'));
    let products = productModel.getProducts();
    res.render('products', {titleEJS : 'Inventory Management', productsVar : products});
  }

  // To add products -- C --
  addNewProduct(req, res){
    res.render("newProduct", {titleEJS : 'Inventory Management - ADD Product'});
  }
  addNewProductSave(req, res){
    const {name, Description, Price, ImageURL} = req.body;  // 1. Get the data.

    // 2. Put all the validations
    if(!name){
      res.render("error", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Name is Empty"});
    }
    if(!validator.isAlpha(name)){
      res.render("error", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Name should be aA - zZ"});
    }

    if(Description.length < 10){
      res.render("error", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Minimum 10 character description required"}); 
    }

    let priceInt = Number(Price);
    if(priceInt < 0){
      res.render("error", {titleEJS : 'Inventory Management - Error', ErrorMsg : "negavtive price can't be given"}); 
    }

    if(!validator.isURL(ImageURL)){
      res.render("error", {titleEJS : 'Inventory Management - Error', ErrorMsg : "URL is not valid"})
    }

    const finalObject = {
      name : name,
      desc : Description,
      price : priceInt,
      imgURL : ImageURL
    }

    const success = productModel.addProduct(finalObject);
    if(success){
      console.log("Data Added Successfully");
      res.redirect('/');
    }else{
      res.send("UnSuccessfully - please retry");
    }

  }
}