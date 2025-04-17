import User from '../models/User';

export class UserService {
  async createUser(
    firstname: string,
    lastname: string,
    phone_no: string,
    password: string,
    address: {
      latitude: number;
      longitude: number;
    },
  ) {
    return await User.create({
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone_no: phone_no,
      address: address,
    });
  }
  async getAllUser() {
    return await User.find().exec();
  }
  async getUserByPhoneNumber(phone_no: string, ) {
    return await User.findOne({ phone_no: phone_no,  }).exec();
  }
  async login(phone_no: string, password:string ) {
    return await User.findOne({ phone_no: phone_no, password:password  });
  }
}
