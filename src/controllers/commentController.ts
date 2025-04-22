import { RequestHandler } from 'express';
import { CommentService } from '../services/CommentService';
import { CommentDTO, CommentQuery, RatingDTO } from '../dto/Commentdto';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
export class CommentController {
  private _service: CommentService;
  constructor(cs: CommentService) {
    this._service = cs;
  }

  createComment: RequestHandler<CommentQuery, unknown, CommentDTO> = async (
    req,
    res,
    next,
  ) => {
    const mid = req.params.mid;
    const uid = req.params.uid;
    const content = req.body.content;
    const rating = req.body.rating;

    try {
      if ([mid, uid, content, rating].some((field) => !field)) {
        throw createHttpError(400, 'Please enter valid credentials');
      }
      const newComment = await this._service.createComment(
        new mongoose.Types.ObjectId(mid),
        new mongoose.Types.ObjectId(uid),

        content,
        rating,
      );
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  getOverallRating: RequestHandler<RatingDTO, unknown, unknown, unknown> =
    async (req, res, next) => {
      const mid = req.params.mid;
      try {
        const getOverallRating = await this._service.getOverallRating(mid);

        if (getOverallRating) res.status(200).json({"averageRating":getOverallRating});
        else throw createHttpError(404, 'There is no rating');
      } catch (error) {
        console.error(error);
        next(error);
      }
    };

  getAllComments: RequestHandler<RatingDTO, unknown, unknown, unknown> = async (
    req,
    res,
    next,
  ) => {
    const mid = req.params.mid;
    try {
      const getAllComments = await this._service.getComment(mid);
      if (getAllComments.length > 0) res.status(200).json(getAllComments);
      else {
        throw createHttpError(404, "Comment doesn't exist");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
