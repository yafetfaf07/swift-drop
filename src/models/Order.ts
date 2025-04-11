import { model, Schema, Types } from 'mongoose';

const orderSchema = new Schema({
  uid: {
    type: Types.ObjectId,
    required: true,
    unique: true,
  },

  pid: {
    type: Types.ObjectId,
    unique: true,
  },
  mid: {
    type: Types.ObjectId,
    unique: true,
  },
  status: {
    type: String,
    default: 'unpaid',
  },
  total: {
    type: Number,
  },
  user: { types: Schema.Types.ObjectId, ref: 'User' },
  products: [{ types: Schema.Types.ObjectId, ref: 'Product' }],
  merchant: { types: Schema.Types.ObjectId },
  //   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

type Order = {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  mid: Types.ObjectId;
  pid: Types.ObjectId[];
  name: string;
  category: string;
  price: number;
  total: number;

  //   notes: Types.ObjectId[];
};

export default model<Order>('Order', orderSchema);
