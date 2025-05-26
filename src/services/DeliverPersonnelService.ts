import DeliverPersonnel from "../models/DeliverPersonnel";
// import * as argon2 from 'argon2'; // used for hashing password

export class DeliverPersonnelService {
  async getAllDelivery() {
    return await DeliverPersonnel.find().exec();
  }

  async login(phone_no: string,password:string ) {
    return await DeliverPersonnel.findOne({ phone_no: phone_no, password:password }).exec();
  }

  async getDeliverPersonnelByPhoneNumber(phone_no: string ) {
    return await DeliverPersonnel.findOne({ phone_no: phone_no }).exec();
  }

  async createDeliverPersonnel(
    firstname: string,
    lastname: string,
    phone_no: string,
    password: string,
    address: {
        latitude: number,
        longitude: number,
    },
  ) {
    return await DeliverPersonnel.create({
        firstname:firstname,
        lastname:lastname,
        phone_no:phone_no,
        password:password,
        address:address,
    })

  }
}
