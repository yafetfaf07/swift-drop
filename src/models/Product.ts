import { model, Schema, Types } from 'mongoose';

const productSchema = new Schema({
  mid: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },

  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

type Product = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;

  //   notes: Types.ObjectId[];
};

export default model<Product>('Product', productSchema);
