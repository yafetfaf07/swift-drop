import mongoose from "mongoose";
// this is for displaying purposes
export interface ProductDTO {
    id:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    imageUrl:string
}
// This is for uploading product stocks
export interface ProductDetailDTO {
    id:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:number,
    quantity:number,
    changedQuantity:number,
    imageUrl:string,
    mid:mongoose.Types.ObjectId
}

export interface ProductId {
    id:mongoose.Types.ObjectId
}