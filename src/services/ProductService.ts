import Product from "../models/Product";
import mongoose from "mongoose";
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
        quantity:quantity,
        mid: merchantId,
        });
    }
    
    async getAllProduct() {
        return await Product.find().exec();
    }
    
    async getProductByMerchantId(merchant_id: string) {
        return await Product.find({ merchant_id: merchant_id }).exec();
    }

    async getProductByName(name:string) {
        return await Product.findOne({name:name}).exec();
    }
}