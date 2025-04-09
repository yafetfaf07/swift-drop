import { model, Schema, Types } from 'mongoose';

const merchantSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  phone_no: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: [Number],
    required: true,
  },
  oid:{
    type:Schema.Types.ObjectId,
    required:false
  },

  password: {
    type: String,
    required: true,
    select: false,
  },


//   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

type Merchant = {
  _id: Types.ObjectId;
  firstname:string,
  lastname:string,
  phone_no:string,
  address:string[2],
  oid:Types.ObjectId,
  pid:Types.ObjectId
  password: string;

//   notes: Types.ObjectId[];
};

export default model<Merchant>('Merchant', merchantSchema);
