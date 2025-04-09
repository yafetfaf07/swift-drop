import { model, Schema, Types } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },

  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type:String,
    required:true
  }
  //   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

type Product = {
  _id: Types.ObjectId;
  name: string,
  category:string,
  price:number,
  quantity:number,
  imageUrl:string

  //   notes: Types.ObjectId[];
};

export default model<Product>('Product', productSchema);
