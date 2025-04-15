import { model, Schema, Types } from 'mongoose';

const productSchema = new Schema({
  mid: {
    type: Schema.Types.ObjectId,
    required: true,
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
    required: true,
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
  mid: Types.ObjectId;
  comments: Types.ObjectId[];

  //   notes: Types.ObjectId[];
};

export default model<Product>('Product', productSchema);
