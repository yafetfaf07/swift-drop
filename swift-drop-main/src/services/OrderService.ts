import { Types } from 'mongoose';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import DeliverPersonnel from '../models/DeliverPersonnel';
import Product from '../models/Product';

// import * as argon2 from 'argon2'; // used for hashing password

export class OrderService {
  async createOrder(uid: Types.ObjectId, createdAt: Date) {
    const deliverPerssonel = await DeliverPersonnel.find({ isActive: false })
      .select('_id')
      .sort({ noOfOrder: 1 })
      .exec();

    console.log('Deliver Personnel: ', deliverPerssonel);

    const order = await Order.create({
      uid: uid,
      did: deliverPerssonel[0],
      createdAt: createdAt,
    });

    if (order) {
      const orderProducts = await OrderProduct.find({ oid: order.id });
      for (const op of orderProducts) {
  for (let i=0; i<op.products.length; i++) {
    const{pid, quantity} = op.products[i];
    console.log("Quantity: ",quantity)
    await Product.updateOne({_id:pid}, {$inc:{changedQuantity:-quantity}})
  }
      }

if(orderProducts) {
  await DeliverPersonnel.updateOne(
    { _id: deliverPerssonel[0] },
    { $inc: { noOfOrder: 1 } },
  );
}
  
    }

    return order;
  }

  async getAllOrders() {
    const orders = await OrderProduct.find().exec();
    return orders;
  }

  async getUserOrderedProducts(userId: Types.ObjectId) {
    // Step 1: Get all orders by user
    const orders = await Order.find({ uid: userId }).select('_id');
    const orderIds = orders.map((order) => order._id);

    // Step 2: Get all order products with product & merchant info
    const orderProducts = await OrderProduct.find({ oid: { $in: orderIds } })
      .populate({
        path: 'pid',
        select: '',
        populate: {
          path: 'mid',
          model: 'Merchant',
          select: 'firstname _id',
        },
      })
      .exec();

    // Step 3: Format result (optional)
    return orderProducts;
  }

  async getOrderByDeliveryId(deliverId: Types.ObjectId) {
    const orders = await Order.aggregate([
      { $match: { did: deliverId } },

      // Join user
      {
        $lookup: {
          from: 'users',
          localField: 'uid',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          'user.firstname': 1,
          'user.phone_no': 1,
          'user.address': 1,
        },
      },

      // Join orderproducts
      {
        $lookup: {
          from: 'orderproducts',
          localField: '_id',
          foreignField: 'oid',
          as: 'orderProducts',
        },
      },
      { $unwind: '$orderProducts' },

      // Join product
      {
        $lookup: {
          from: 'products',
          localField: 'orderProducts.pid',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },

      // Join merchant
      {
        $lookup: {
          from: 'merchants',
          localField: 'product.mid',
          foreignField: '_id',
          as: 'merchant',
        },
      },
      { $unwind: '$merchant' },
    ]);

    return orders;
  }
}
