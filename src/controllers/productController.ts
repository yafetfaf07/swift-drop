import createHttpError from 'http-errors';
import Product from '../models/Product';
import { ProductDetailDTO } from '../dto/Productdto';
import { RequestHandler } from 'express';


// This is for creaing product
export const createProduct: RequestHandler<
  unknown,
  unknown,
  ProductDetailDTO,
  unknown
> = async (req, res, next) => {
  const merchantId= req.body.mid;
  const name = req.body.name;
  const category = req.body.category;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const quantity = req.body.quantity;
  try {
    if (!name || !category || !imageUrl || !price || !quantity) {
      throw createHttpError(400, 'Please enter full info');
    }
    const existingProduct = await Product.findOne({
        name:name
    }).exec();

    if(existingProduct) {
        throw createHttpError(409, "This product exist in stock")
    }

    const newProduct = await Product.create({
        name:name,
        category:category,
        price:price,
        quantity:quantity,
        imageUrl:imageUrl,
        mid:merchantId
    });

    res.status(201).json(newProduct);

} catch (error) {
    next(error);
  }
};
