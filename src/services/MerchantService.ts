import Merchant from '../models/Merchant';
// import * as argon2 from 'argon2'; // used for hashing password

export class MerchantService {
  async getAllMerchant() {
    return await Merchant.find().exec();
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
  ) {
    return await Merchant.create({
      firstname: firstname,
      lastname: lastname,
      phone_no: phone_no,
      password: password,
      address: address,
    });
  }
}
