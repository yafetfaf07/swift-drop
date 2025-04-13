import { MerchantController } from "../controllers/merchantController";
import express from "express";



export class MerchantRouter {
    private  _controller:MerchantController;
     router;
    constructor(cs:MerchantController) {
        this._controller=cs;
        this.router=express.Router();
    }

    registerRoutes() {
        this.router.post('/signup', this._controller.createMerchant)
        this.router.get('/login', this._controller.login)
        return this.router;
    }

}