import escapeHTML from 'escape-html';
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
    res.render("newProduct", {titleEJS : 'Inventory Management - ADD Product'}); // not passing ErrorMsg, so use locals in ejs to handle it
  }
  addNewProductSave(req, res){
    const {name, Description, Price} = req.body;  // 1. Get the data.
   
    let errors = [];
    // 2. Put all the validations

    if(!req.file || !req.file.filename){
      const ErrorMsg = "URL is not valid";
      errors.push(ErrorMsg);
     // return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "URL is not valid" })
    } 

    const ImageURL = `http://localhost:8001/Images/${req.file.filename}`;

    if(!name){
      const ErrorMsg = "Name is Empty";
      errors.push(ErrorMsg);
    }
    if(!validator.isAlpha(name)){
      const ErrorMsg =  "Name should be aA - zZ";
      errors.push(ErrorMsg);
      //return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Name should be aA - zZ"});
    }

    if(Description.length < 10){
      const ErrorMsg = "Minimum 10 character description required";
      errors.push(ErrorMsg);
      // return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Minimum 10 character description required"}); 
    }

    let priceInt = Number(Price);
    if(priceInt < 0){
      const ErrorMsg = "negative price can't be given";
      errors.push(ErrorMsg);
      //return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "negavtive price can't be given"}); 
    }

    if(errors.length > 0){
      return res.render('newProduct', {titleEJS : 'Inventory Management - Error', name:name, desc:Description, price:priceInt, imgURL:ImageURL, ErrorMsg:errors[0]})
    }else{
      const finalObject = {
        name : name,
        desc : Description,
        price : priceInt,
        imgURL : ImageURL
      }
      const success = productModel.addProduct(finalObject);
      if(success){
        console.log("Data Added Successfully");
        return res.redirect('/');
      }else{
        return res.send("UnSuccessfully - please retry");
      }
    }
  }

  // To get product using ID -- U --
  getProductByID(req, res){
    const {id}=req.query;
    let errorMsg = null;
    let idAsNum = Number(id);
    if(Number.isNaN(idAsNum)){
      errorMsg = "Is not a valid number";
      return;
    }
    const product = productModel.getProductByID(idAsNum);
    if(!product){
      errorMsg = "Id not Found";
    }
    console.log(product);
    // return res.send(product);
    console.log(product.desc);
    return res.render('newProduct', {titleEJS : 'Inventory Management - Edit',productid:product.id, name:escapeHTML(product.name), desc:escapeHTML(product.desc), price:product.price, imgURL:product.imgURL, isEdit:true});
  }

  editProductSave(req, res){
    const {id, name, Description, Price} = req.body;  // 1. Get the data.
    let {ImageURL} = req.body;
    console.log(req.body);
    let errors = [];

    if(req.file){
      ImageURL = `http://localhost:8001/Images/${req.file.filename}`;
    }

    console.log('imageUrl  : ' , ImageURL);

    if(!productModel.isValidID(id)){
      const ErrorMsg = "ID is not valid";
      errors.push(ErrorMsg);
    }

    // 2. Put all the validations
    if(!name){
      const ErrorMsg = "Name is Empty";
      errors.push(ErrorMsg);
    }
    if(!validator.isAlpha(name)){
      const ErrorMsg =  "Name should be aA - zZ";
      errors.push(ErrorMsg);
      //return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Name should be aA - zZ"});
    }

    if(Description.length < 10){
      const ErrorMsg = "Minimum 10 character description required";
      errors.push(ErrorMsg);
      // return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "Minimum 10 character description required"}); 
    }

    let priceInt = Number(Price);
    if(priceInt < 0){
      const ErrorMsg = "negative price can't be given";
      errors.push(ErrorMsg);
      //return res.render("newProduct", {titleEJS : 'Inventory Management - Error', ErrorMsg : "negavtive price can't be given"}); 
    }

    if(errors.length > 0){
      return res.render('newProduct', {titleEJS : 'Inventory Management - Error',productid:id, name:name, desc:Description, price:priceInt, imgURL:ImageURL, ErrorMsg:errors[0], isEdit:true})
    }else{
      const finalObject = {
        id : Number(id),
        name : name.trim(),
        desc : Description.trim(),
        price : priceInt,
        imgURL : ImageURL.trim()
      }
      // const success = productModel.addProduct(finalObject);
      let EditDone = productModel.editProduct(finalObject);
      if(EditDone){
        return res.redirect('/');
      }else{
        return res.send("Unsuccessful");
      }
      
    }
  }

  // To delete a product -- D --
  deleteProduct(req, res){
    const {id} = req.params;
    let errorMsg = '';
    let _id = Number(id);
    if(Number.isNaN(_id)){
      errorMsg = 'Not a valid ID';
    }

    let isValidID = productModel.isValidID(_id);

    if(!isValidID){
      errorMsg = 'ID is not present...!';
    }
    // errorMsg = 'error is there...!';
    if(errorMsg){
      return res.status(401).json({
        'success':false,
        errorMsg:errorMsg
      })
    }

    productModel.findAndDelete(_id);

    return res.status(200).json({
      'success':true
    })
  }
}