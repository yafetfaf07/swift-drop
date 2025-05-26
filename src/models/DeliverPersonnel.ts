import { model, Schema, Types } from 'mongoose';

const deliverSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
    unique: true,
  },
  address:{
    type:{}
  },
  password: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    default:false,
    required:true
  },
  noOfOrder: {
    type:Number,
    required:true,
    default:0
  }
});

type DeliverPersonnel = {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  phone_no: string;
  address: {
    latitude: number;
    longitude: number;
  };
  password: string;
};

export default model<DeliverPersonnel>('DeliverPersonnel', deliverSchema);
