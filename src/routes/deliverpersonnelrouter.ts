import { DeliverPersonnelController } from "../controllers/deliverPersonnelController";
import express from "express";

export class DeliverPersonnelRouter {
    private _controller: DeliverPersonnelController;
    router;

    constructor(cs: DeliverPersonnelController) {
        this._controller = cs;
        this.router = express.Router();
    }

    registerRoutes() {
        this.router.post('/signup', this._controller.createDeliverPersonnel.bind(this._controller));
        this.router.get('/login', this._controller.login.bind(this._controller));
        return this.router;
    }
}
