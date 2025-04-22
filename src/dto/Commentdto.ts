import mongoose from 'mongoose';

// This is for creating a new Comment
export interface CommentDTO {
  content:string,
  rating:number,

}

export interface CommentQuery {
    mid:mongoose.Types.ObjectId
    uid:mongoose.Types.ObjectId
}
// This is for displaying the rating only
export interface RatingDTO {
    mid:mongoose.Types.ObjectId,
}
// This is for changing profile



