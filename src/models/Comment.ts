import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema({
  mid: {
    type: Schema.Types.ObjectId,
  },
  uid: {
    type: Schema.Types.ObjectId,
  },

  content: {
    type: String,
  
  },
  rating: {
    type: Number,

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
