import Product from "../models/Product";
import { Schema } from "mongoose";
export class ProductService {
    async createProduct(
        name: string,
        price: number,
        image: string,
        category: string,
        quantity: number,
        merchant_id: Schema.Types.ObjectId,
    ) {
        return await Product.create({
        name: name,
        price: price,
        image: image,
        category: category,
        quantity:quantity,
        merchant_id: merchant_id,
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