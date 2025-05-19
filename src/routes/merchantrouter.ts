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
        this.router.post('/signup', this._controller.createMerchant.bind(this._controller));
        this.router.get('/login', this._controller.login.bind(this._controller));
        this.router.get('/getAllMerchant', this._controller.getAllMerchant.bind(this._controller));
        return this.router;
    }

}