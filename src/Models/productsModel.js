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
}

const products = [
  new productModel(
    1,
    "Ikigai",
    "It's the Japanese word for 'a reason to live' or 'a reason to jump out of bed in the morning'.",
    400,
    "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  ),
  new productModel(
    2,
    'Atomic Habits',
    "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    300,
    "https://m.media-amazon.com/images/I/81F90H7hnML.jpg"
  ),
  new productModel(
    3,
    'Eat that Frog',
    "21 Great Ways to Stop Procrastinating and Get More Done in Less Time",
    150,
    "https://m.media-amazon.com/images/I/61ZNAnIrwwL._AC_UF1000,1000_QL80_.jpg"
  )
];
