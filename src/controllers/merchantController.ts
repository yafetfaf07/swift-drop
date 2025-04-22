import createHttpError from 'http-errors';
import Merchant from '../models/Merchant';
import { RequestHandler } from 'express';
import { MerchantDTO, MerchantLogin } from '../dto/Merchantdto';
import { MerchantService } from '../services/MerchantService';

export class MerchantController {
  private __services: MerchantService;
  constructor(ms: MerchantService) {
    this.__services = ms;
  }
  createMerchant: RequestHandler<unknown, unknown, MerchantDTO, unknown> =
    async (req, res, next) => {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const phone_no = req.body.phone_no;
      const passwordRaw = req.body.password;
      const address = req.body.address;
      const openingTime=req.body.openingTime;
      const closingTime=req.body.closingTime;
      try {
        if (!firstname || !lastname || !passwordRaw || !address || !phone_no || !closingTime || !openingTime) {
          throw createHttpError(400, 'Please enter valid credentials ');
        }

        const existingUser =
          await this.__services.getMerchantByPhoneNumber(phone_no);
        if (existingUser) {
          throw createHttpError(409, 'This user already exists'); // conflict
        }
        // This is
        // const hashedPassword = await argon2.hash(passwordRaw);

        const newMerchant = await this.__services.createMerchant(
          firstname,
          lastname,
          phone_no,
          passwordRaw,
          address,
          openingTime,
          closingTime
        );

        res.status(201).json(newMerchant);
      } catch (error) {
        console.error("This is my erroroooooooo",error);
        next(error);
      }
    };

  //For Getting all Users

  getAllUser: RequestHandler = async (req, res, next) => {
    const allUsers = await Merchant.find().exec();

    try {
      if (!allUsers) {
        throw createHttpError(404, 'No merchants found');
      }

      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  };

  // For login purposes

  login: RequestHandler<unknown, unknown, MerchantLogin, unknown> = async (
    req,
    res,
    next,
  ) => {
    const phone_no = req.body.phone_no;
    const password = req.body.password;

    if (!phone_no || !password) {
      throw createHttpError(400, 'Please enter a username');
    }
    try {
      const loginUser = await this.__services.login(phone_no, password);
      if (!loginUser) {
        throw createHttpError(404, "User doesn't exist");
      }
      res.status(200).json(loginUser);
    } catch (error) {
      next(error);
    }
  };
}
// For creating Merchant
