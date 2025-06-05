import { model, Schema, Types } from 'mongoose';

const productSchema = new Schema({
  mid: {
    type: Types.ObjectId,
    required: true,
    ref: 'Merchant',
  },
  name: {
    type: String,
    required: true,
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
  changedQuantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

type Product = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
  changedQuantity: number;
  imageUrl: string;
  mid: Types.ObjectId;

  //   notes: Types.ObjectId[];
};

export default model<Product>('Product', productSchema);
