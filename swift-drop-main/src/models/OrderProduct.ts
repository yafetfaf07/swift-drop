import { model, Schema, Types } from 'mongoose';

const orderProductSchema = new Schema({
  oid: {
    type: Types.ObjectId,
    required: true,
    ref: 'Order',
  },

  products: [
    {
      pid: {
        type: Types.ObjectId,
        ref: 'Product',
        
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type Order = {
  oid: Types.ObjectId;
  products:[]
  createdAt: Date;
};

export default model<Order>('OrderProduct', orderProductSchema);
