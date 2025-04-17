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
  address: {
    type: {},
    required: true,
  },


  password: {
    type: String,
    required: true,
  },
});

type DeliverPersonnel = {
  _id: Types.ObjectId;
  firstname:string,
  lastname:string,
  phone_no:string,
  address:string[],
  password: string;

};

export default model<DeliverPersonnel>('DeliverPersonnel', deliverSchema);
