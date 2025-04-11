import { model, Schema, Types } from 'mongoose';

const deliverSchema = new Schema({
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
  oid:[{
    type:Schema.Types.ObjectId,
    required:false
  }],

  password: {
    type: String,
    required: true,
    select: false,
  },


//   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
orders:[{type:Schema.Types.ObjectId, ref:"Order"}]
});

type DeliverPersonnel = {
  _id: Types.ObjectId;
  firstname:string,
  lastname:string,
  phone_no:string,
  address:string[],
  oid:Types.ObjectId[],
  password: string;

//   notes: Types.ObjectId[];
};

export default model<DeliverPersonnel>('DeliverPersonnel', deliverSchema);
