import Product from '../models/Product';
import mongoose from 'mongoose';
export class ProductService {
  async createProduct(
    name: string,
    price: number,
    imageUrl: string,
    category: string,
    quantity: number,
    merchantId: mongoose.Types.ObjectId,
  ) {
    return await Product.create({
      name: name,
      price: price,
      imageUrl: imageUrl,
      category: category,
      quantity: quantity,
      mid: merchantId,
    });
  }

  async getAllProduct() {
    return await Product.find().exec();
  }
  async getAllProductById(id: mongoose.Types.ObjectId) {
    return await Product.find({ _id: id });
  }

  async getProductByMerchantId(merchant_id: mongoose.Types.ObjectId) {
    return await Product.find({ mid: merchant_id }).exec();
  }

  async getProductByName(name: string) {
    return await Product.findOne({ name: name }).exec();
  }
  async getProductByCategory(category: string) {
    const getProduct = await Product.aggregate([
        { $match: { category: category } },
        {
          $group: {
            _id: "$mid" // group by merchant
          }
        },
        {
          $lookup: {
            from: "merchants", // collection name (lowercase plural of model)
            localField: "_id",
            foreignField: "_id",
            as: "merchant"
          }
        },
        {
          $unwind: "$merchant"
        },
        {
          $project: {
            _id: 0,
            mid: "$merchant._id",
            firstname: "$merchant.firstname",
            address: "$merchant.address"
          }
        }
      ]);
      
    return getProduct;
  }
}
