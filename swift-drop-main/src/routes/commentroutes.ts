import { CommentController } from "../controllers/commentController";
import express from "express";
export class CommentRouter {
    private _controller:CommentController;
    router;
    constructor(cs:CommentController) {
        this._controller=cs;
        this.router=express.Router();
    }

    registerRoutes() {
        this.router.post('/create/:mid/:uid', this._controller.createComment);
        this.router.get('/load/:mid', this._controller.getAllComments);
        this.router.get('/rating/:mid', this._controller.getOverallRating);
        return this.router;
    }
}