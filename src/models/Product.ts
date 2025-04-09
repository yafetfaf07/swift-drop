import { model, Schema, Types } from 'mongoose';

const merchantSchema = new Schema({
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
  //   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

type Merchant = {
  _id: Types.ObjectId;
  name: string,
  category:string,
  price:number,
  quantity:number

  //   notes: Types.ObjectId[];
};

export default model<Merchant>('Merchant', merchantSchema);
