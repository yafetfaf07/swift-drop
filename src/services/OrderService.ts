import { Types } from 'mongoose';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import DeliverPersonnel from '../models/DeliverPersonnel';

// import * as argon2 from 'argon2'; // used for hashing password

export class OrderService {
  async createOrder(uid: Types.ObjectId, did: Types.ObjectId, createdAt: Date) {
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
      await DeliverPersonnel.updateOne(
        { _id: deliverPerssonel[0] },
        { $inc: { noOfOrder: 1 } },
      );
    }

    return order;
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
   return await Order.aggregate([
    { $match: { did: deliverId } },

    // Join user
    {
      $lookup: {
        from: "users",
        localField: "uid",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },

    {
      $lookup: {
        from:"deliverpersonnels",
        localField:"did",
        foreignField:'_id',
        as:'deliverInfo'
      }
    },
    {$unwind:"$deliverInfo"},
  
    // Join OrderProducts
    {
      $lookup: {
        from: "orderproducts",
        localField: "_id",
        foreignField: "oid",
        as: "orderProducts"
      }
    },
    { $unwind: "$orderProducts" },
  
    // Join product data
    {
      $lookup: {
        from: "products",
        localField: "orderProducts.pid",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
  
    // Join merchant from product
    {
      $lookup: {
        from: "merchants",
        localField: "product.mid",
        foreignField: "_id",
        as: "merchant"
      }
    },
    { $unwind: "$merchant" },
  
    // Group by order
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        products: {
          $push: {
            id: "$product._id",
            name: "$product.name",
            price: "$product.price",
            quantity: "$orderProducts.quantity",
            merchant: {
              _id: "$merchant._id",
              firstname: "$merchant.firstname",
              address: "$merchant.address"
            }
          }
        }
      }
    },
 
    {
      $project: {
        orderId: "$_id",
        user: {
          _id: "$user._id",
          firstname: "$user.firstname",
          address: "$user.address"
        },
        noOfOrder:'$deliverInfo.noOfOrder',
        products: 1,
        _id: 0
      }
    }
    ]);
  }
}
