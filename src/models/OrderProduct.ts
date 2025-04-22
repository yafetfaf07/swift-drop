import { model, Schema, Types } from 'mongoose';

const orderProductSchema = new Schema({
  oid: {
    type: Types.ObjectId,
    required: true,
    ref: 'Order',
  },

  pid: {
    type: Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type Order = {
  oid: Types.ObjectId;
  pid: Types.ObjectId;
  createdAt: Date;
};

export default model<Order>('OrderProduct', orderProductSchema);
