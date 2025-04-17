import { UserController } from "../controllers/userController";
import express from "express";

export class UserRouter {
    private _controller: UserController;
    router;
    constructor(cs: UserController) {
        this._controller = cs;
        this.router = express.Router();
    }
    registerRoutes() {
        this.router.post('/signup', this._controller.createUser.bind(this._controller));
        // this.router.get('/getAllUser', this._controller.getAllUser);
        // this.router.post('/getUserByPhoneNumber', this._controller.getUserByPhoneNumber);
        this.router.get('/login', this._controller.login.bind(this._controller));
        return this.router;
    }
}