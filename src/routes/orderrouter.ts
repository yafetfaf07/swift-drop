import { OrderController } from "../controllers/orderController";
import express from "express";

export class OrderRouter {
    private _controller: OrderController;
    router;

    constructor(cs: OrderController) {
        this._controller = cs;
        this.router = express.Router();
    }

    registerRoutes() {
        this.router.post("/create", this._controller.createOrder.bind(this._controller));
        this.router.get("/get/:id", this._controller.getOrder.bind(this._controller))
        return this.router;
    }
}
