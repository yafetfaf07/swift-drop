import { Types } from 'mongoose';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';

// import * as argon2 from 'argon2'; // used for hashing password

export class OrderService {
  async createOrder(uid: Types.ObjectId, did: Types.ObjectId, createdAt: Date) {
    return await Order.create({
      uid: uid,
      did: did,
      createdAt: createdAt,
    });
  }

  async getUserOrderedProducts(userId: Types.ObjectId) {
    // Step 1: Get all orders by user
    const orders = await Order.find({ uid: userId }).select('_id');
    const orderIds = orders.map(order => order._id);
  
    // Step 2: Get all order products with product & merchant info
    const orderProducts = await OrderProduct.find({ oid: { $in: orderIds } })
      .populate({
        path: 'pid',
        select:"name",
        populate: {
          path: 'mid',
          model: 'Merchant',
          select:"firstname _id"
        }
      })
      .exec();
  
    // Step 3: Format result (optional)
 return orderProducts;
  }
  
  
}
