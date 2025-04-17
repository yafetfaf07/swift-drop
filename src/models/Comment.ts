import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema({
  mid: {
    type: Schema.Types.ObjectId,
    required:true
  },
  uid: {
    type: Schema.Types.ObjectId,
    required:true
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
