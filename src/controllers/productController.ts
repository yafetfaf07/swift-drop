import createHttpError from 'http-errors';
import { ProductDetailDTO, ProductId } from '../dto/Productdto';
import { RequestHandler } from 'express';
import { ProductService } from '../services/ProductService';

// This is for creaing product
export class ProductController {
  private _services: ProductService;
  constructor(ps: ProductService) {
    this._services = ps;
  }
  createProduct: RequestHandler<ProductId, unknown, ProductDetailDTO, unknown> =
    async (req, res, next) => {
      const merchantId = req.params.id;
      const name = req.body.name;
      const category = req.body.category;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const quantity = req.body.quantity;
      try {
        if (
          !name ||
          !category ||
          !imageUrl ||
          !price ||
          !quantity ||
          !merchantId
        ) {
          throw createHttpError(400, 'Please enter full info');
        }
        const existingProduct = await this._services.getProductByName(name);

        if (existingProduct) {
          throw createHttpError(409, 'This product exist in stock');
        }
        const newProduct = await this._services.createProduct(
          name,
          price,
          imageUrl,
          category,
          quantity,
          merchantId,
        );

        res.status(201).json(newProduct);
      } catch (error) {
        next(error);
      }
    };
}
