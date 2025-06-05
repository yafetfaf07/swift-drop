import { model, Schema, Types } from 'mongoose';

const orderSchema = new Schema({
  uid: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },

  did: {
    type: Types.ObjectId,
    required: true,
    ref: 'DeliverPersonnel',
  },
  createdAt: {
    type:  Date,
    default: Date.now,
  },
});

type Order = {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  did: Types.ObjectId;
  createdAt: Date;

};

export default model<Order>('Order', orderSchema);
