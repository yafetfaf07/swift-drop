import createHttpError from 'http-errors';
import { RequestHandler } from 'express';
import {  OrderService } from '../services/OrderService';
import mongoose from 'mongoose';
import { OrderDTO } from '../dto/Orderdto';
import OrderProduct from '../models/OrderProduct';


// This is for creaing product

export class OrderController {
  private _services: OrderService;
  constructor(ps: OrderService) {
    this._services = ps;
  }
  createOrder: RequestHandler<{ id: string }, unknown, OrderDTO> =
    async (req, res, next) => {
        try {
            const { uid, did, pid } = req.body;
            const order = await this._services.createOrder(
            new mongoose.Types.ObjectId(uid),
            new mongoose.Types.ObjectId(did),
            new Date()
            );
            if (!order) {
                throw createHttpError(400, 'Please enter full info');
            }
            else {
                const orderProducts = pid.map(pid => ({
                    oid: order._id,
                    pid,
                  }));
                  if(orderProducts) {
                    await OrderProduct.insertMany(orderProducts);
                  }
            }
            // const existingOrder = await this._services.getOrderById(order._id);
            res.status(201).json(order);
        } catch (error) {
            console.error("Error in Order Controller",error)
            next(error);
        }
    };

    getOrderByProductId:RequestHandler<{id:string}, unknown, unknown> = async(req,res,next) => {
      const id = new mongoose.Types.ObjectId(req.params.id);
      try {
        const getOrder = await this._services.getUserOrderedProducts(id);
        if(getOrder.length==0) {
          throw createHttpError(404,"No orders found")
        }
        else {
          res.status(200).json(getOrder);
        }
        
      } catch (error) {
        console.error(error);
        next(error);
      }
   
    }
    getOrderByDeliveryId:RequestHandler<{id:string}, unknown, unknown,unknown> = async(req,res,next) => {
      const id = new mongoose.Types.ObjectId(req.params.id);

      try {
        const getOrder = await this._services.getOrderByDeliveryId(id);
        if(getOrder.length==0) {
          throw createHttpError({message:"No order found"})
        } 
        else {
          res.status(200).json(getOrder);
        } 
      
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
}
