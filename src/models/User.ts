import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema({
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
    unique: true,
  },
  address: {
    latitude: Number,
    longitude: Number,
    // required: true,
  },
  oid: {
    type: Schema.Types.ObjectId,
    // required:false
  },

  password: {
    type: String,
    // required: true,
    select: false,
  },

  //   notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

type User = {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  phone_no: string;
  address: {
    latitude: number;
    longitude: number;
  };
  oid: Types.ObjectId;
  password: string;

  //   notes: Types.ObjectId[];
};

export default model<User>('User', userSchema);
