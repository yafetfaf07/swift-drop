import Merchant from '../models/Merchant';
// import * as argon2 from 'argon2'; // used for hashing password

export class MerchantService {
  async getAllMerchant() {
    const merchants = await Merchant.aggregate([
      {
        $lookup: {
          from: "comments",        // MongoDB collection name (not model name)
          localField: "_id",       // match Merchant._id
          foreignField: "mid",     // match Comment.mid
          as: "ratings"            // this is an array of matching comments
        }
      },
      {
        $addFields: {
          overallRating: {
            $cond: [
              { $gt: [{ $size: "$ratings" }, 0] },
              {
                $divide: [
                  { $sum: "$ratings.rating" },
                  { $size: "$ratings" }
                ]
              },
              null  // or 0 if you prefer
            ]
          }
        }
      },
      {
        $project: {
          overallRating: 1, // ❌ Hide raw comments array, ✅ keep everything else
          firstname:1,
          address:1,
          
        }
      }
    ]);

    return merchants;
  }

  async login(phone_no: string,password:string ) {
    return await Merchant.findOne({ phone_no: phone_no, password:password }).exec();
  }

  async getMerchantByPhoneNumber(phone_no: string ) {
    return await Merchant.findOne({ phone_no: phone_no }).exec();
  }

  async createMerchant(
    firstname: string,
    lastname: string,
    phone_no: string,
    password: string,
    address: {
        latitude: number,
        longitude: number,
    },
    openingTime:string,
    closingTime:string
  ) {
    return await Merchant.create({
      firstname: firstname,
      lastname: lastname,
      phone_no: phone_no,
      password: password,
      address: address,
      openingTime:openingTime,
      closingTime:closingTime
    });
  }
}
