import { model, Schema, Types } from 'mongoose';
const merchantSchema = new Schema({
  firstname: {
    type: String,
    // required: true,
    // unique: false,
  },
  lastname: {
    type: String,
    // required: true,
    // unique: false,
  },
  phone_no: {
    type: String,
    // required: true,
    // unique: true,
  },
  address: {
    type: {},
    // required: true,
  },



  password: {
    type: String,
    required: true,
    // select: false,
  },

});

type Merchant = {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  phone_no: string;
  address: {latitude: number; longitude: number};
  // oid: Types.ObjectId[]; // order id
  // pid: Types.ObjectId[]; // product id
  password: string;

  //   notes: Types.ObjectId[];
};

export default model<Merchant>('Merchant', merchantSchema);
