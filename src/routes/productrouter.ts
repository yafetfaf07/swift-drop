import express from 'express';
import { ProductController } from '../controllers/productController';
import { upload } from '../middlewares/multerconfig';
export class ProductRouter {
  private _controller: ProductController;
  router;
  constructor(cs: ProductController) {
    this._controller = cs;
    this.router = express.Router();
  }
  registerRoutes() {
    this.router.post(
      '/create/:id',
      upload.single('file'),
      this._controller.createProduct.bind(this._controller),
    );
    // this.router.get('/getAllProducts', this._controller.getAllProducts);
    // this.router.get('/getProductByName', this._controller.getProductByName);
    // this.router.get('/getProductById/:id', this._controller.getProductById);
    return this.router;
  }
}
