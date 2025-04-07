import path from 'path';

// export function getAllProducts(req, res){
//   res.sendFile(path.join(path.resolve(), 'src', 'Views', 'products.html'));
// }


export default class productController{
  getAllProducts(req, res){
    res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
  }
}