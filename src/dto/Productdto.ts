import { Schema } from "mongoose";
// this is for displaying purposes
export interface ProductDTO {
    id:Schema.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    imageUrl:string
}
// This is for uploading product stocks
export interface ProductDetailDTO {
    id:Schema.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    quantity:number,
    imageUrl:string,
    mid:Schema.Types.ObjectId
}