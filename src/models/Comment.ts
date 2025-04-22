import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema({
  mid: {
    type: Schema.Types.ObjectId,
    required:true,
    ref:"Merchant"
  },
  uid: {
    type: Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },

  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

type Comment = {
  _id: Types.ObjectId;
  mid: Types.ObjectId;
  uid: Types.ObjectId;
  rating: number;
  content: string;

  //   notes: Types.ObjectId[];
};

export default model<Comment>('Comment', commentSchema);
