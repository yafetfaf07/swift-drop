import createHttpError from 'http-errors';
import { ProductDetailDTO } from '../dto/Productdto';
import { RequestHandler } from 'express';
import { ProductService } from '../services/ProductService';
import mongoose from 'mongoose';

// This is for creaing product
export class ProductController {
  private _services: ProductService;
  constructor(ps: ProductService) {
    this._services = ps;
  }
  createProduct: RequestHandler<{ id: string }, unknown, ProductDetailDTO> =
    async (req, res, next) => {
      const merchantId = new mongoose.Types.ObjectId(req.params.id);
      const name = req.body.name;
      const category = req.body.category;
      const imageUrl = `uploads/${req.file?.filename}`;
      const price = req.body.price;
      const quantity = req.body.quantity;
      const changedQuantity = req.body.changedQuantity;
      try {
        if (
          !name &&
          !category &&
          !imageUrl &&
          !price &&
          !quantity &&
          !merchantId &&
          !changedQuantity
        ) {
          throw createHttpError(400, 'Please enter full info');
        }
        const existingProduct = await this._services.getProductByName(name);

        if (existingProduct) {
          throw createHttpError(409, 'This product exist in stock');
        }

        // console.log("Data: ",{name, category, imageUrl, price, quantity, merchantId});
        const newProduct = await this._services.createProduct(
          name,
          price,
          imageUrl,
          category,
          quantity,
          changedQuantity,
          merchantId,
        );

        res.status(201).json(newProduct);
      } catch (error) {
        console.error('Error in Product Controller', error);
        next(error);
      }
    };

  getProduct: RequestHandler = async (req, res, next) => {
    try {
      const getAllProduct = await this._services.getAllProduct();

      if (!getAllProduct) {
        throw createHttpError(404, 'There is no Product');
      }
      res.status(200).json(getAllProduct);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  getProductById: RequestHandler<{ id: string }, unknown, unknown, unknown> =
    async (req, res, next) => {
      try {
        const id = new mongoose.Types.ObjectId(req.params.id);

        const getProductById = await this._services.getAllProductById(id);
        if (getProductById.length == 0)
          throw createHttpError(404, 'No ProductFound');
        else {
          res.status(200).json(getProductById);
        }
      } catch (error) {
        console.error(error);
        next(error);
      }
    };

  getProductByMerchantId: RequestHandler<
    { id: string },
    unknown,
    unknown,
    unknown
  > = async (req, res, next) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    try {
      const getProductByMerchantId =
        await this._services.getProductByMerchantId(id);
      if (getProductByMerchantId.length == 0) {
        throw createHttpError(404, 'No Products found');
      } else {
        res.status(200).json(getProductByMerchantId);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  getProductByCategory: RequestHandler<
    { category: string },
    unknown,
    unknown,
    unknown
  > = async (req, res, next) => {
    try {
      const getProductByCategory = await this._services.getProductByCategory(
        req.params.category,
      );

      if (getProductByCategory.length == 0) {
        console.log(getProductByCategory);
        throw createHttpError(404, 'No Merchant found');
      } else {
        res.status(200).json(getProductByCategory);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
