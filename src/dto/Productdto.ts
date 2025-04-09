import { Schema } from "mongoose";

interface ProductDTO {
    id:Schema.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    imageUrl:string
}

interface ProductDetailDTO {
    id:Schema.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    quantity:number,
    imageUrl:string
}