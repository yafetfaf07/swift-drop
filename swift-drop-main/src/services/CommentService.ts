import Comment from '../models/Comment';
import mongoose, { Types } from 'mongoose';
export class CommentService {
  async createComment(
    merchantId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    content: string,
    rating: number,
  ) {
    return await Comment.create({
      mid: merchantId,
      uid: userId,
      rating: rating,
      content: content,
    });
  }

  async getComment(mid:Types.ObjectId) {
    return await Comment.find({ mid: mid }).exec();
  }
  async getOverallRating(mid: Types.ObjectId) {
    const OverallRating = await Comment.find({mid:mid}, {rating:1, _id:0})
    const overallrating = OverallRating.map(item => item.rating).reduce((acc,curr) => acc + curr,0);
    return overallrating/OverallRating.length;
  }
}
