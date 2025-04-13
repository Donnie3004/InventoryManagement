export default class productModel {
  constructor(_id, _name, _desc, _price, _imgURL) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imgURL = _imgURL;
  }

  // To get products -- R --
  static getProducts(){
    return products;
  }


  // To add new product -- C --
  static addProduct(prodObj){
    let newProd = new productModel(products.length + 1, prodObj.name, prodObj.desc, prodObj.price, prodObj.imgURL);
    products.push(newProd);
    return true;
  }


  // To add new product -- U --
  static getProductByID(_id){
    const productReq = products.filter((item) => item.id === _id);
    return productReq[0];
  }
  static editProduct(prodObj){
    let editDone = false;
    for(let i=0;i<products.length;i++){
      if(products[i].id === prodObj.id){
        products[i].name = prodObj.name;
        products[i].desc = prodObj.desc;
        products[i].price = prodObj.price;
        products[i].imgURL = prodObj.imgURL;
        editDone = true;
        break;
      }
    }
    return editDone;
  }
  static isValidID(_id){
    let idFound = false;
    for(let i=0;i<products.length;i++){
      if(products[i].id === Number(_id)){
        idFound = true;
        break;
      }
    }
    return idFound;
  }

  // To add new product -- D --
  static findAndDelete(_id){
    let wasDeleted = false;
    console.log("inside model....", _id);
    const originalLength = products.length;
    products = products.filter(item => item.id !== _id);
    wasDeleted = products.length < originalLength;
    return wasDeleted;
  }
}

let products = [
  new productModel(
    1001,
    "Ikigai",
    "It's the Japanese word for 'a reason to live' or 'a reason to jump out of bed in the morning.",
    400,
    "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  ),
  new productModel(
    1002,
    'Atomic Habits',
    "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    300,
    "https://m.media-amazon.com/images/I/81F90H7hnML.jpg"
  ),
  new productModel(
    1003,
    'Eat that Frog',
    "21 Great Ways to Stop Procrastinating and Get More Done in Less Time",
    150,
    "https://m.media-amazon.com/images/I/61ZNAnIrwwL._AC_UF1000,1000_QL80_.jpg"
  )
];
