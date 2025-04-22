import { Types } from 'mongoose';
import Order from '../models/Order';
// import * as argon2 from 'argon2'; // used for hashing password

export class OrderService {
  async createOrder(uid: Types.ObjectId, did: Types.ObjectId, createdAt: Date) {
    return await Order.create({
      uid: uid,
      did: did,
      createdAt: createdAt,
    });
  }
  async getAllOrder() {
    return await Order.find().exec();
  }

 
  
}