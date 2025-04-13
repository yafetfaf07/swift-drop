import createHttpError from 'http-errors';
import Merchant from '../models/Merchant';
import { RequestHandler } from 'express';
import { MerchantDTO, MerchantLogin } from '../dto/Merchantdto';
import { MerchantService } from '../services/MerchantService';

export class MerchantController {
  private readonly __services: MerchantService;
  constructor(ms: MerchantService) {
    this.__services = ms;
  }
  createMerchant: RequestHandler<unknown, unknown, MerchantDTO, unknown> =
    async (req, res, next) => {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const passwordRaw = req.body.password;
      const address = req.body.address;
      const phone_no = req.body.phone_no;
      try {
        if (!firstname || !lastname || !passwordRaw || !address || !phone_no) {
          throw createHttpError(400, 'Please enter valid credentials ');
        }
        const existingUser = await this.__services.getAllMerchant();
        if (existingUser) {
          throw createHttpError(409, 'This user already exists'); // conflict
        }
        // This is
        // const hashedPassword = await argon2.hash(passwordRaw);

        const newMerchant = await this.__services.createMerchant(
          firstname,
          lastname,
          passwordRaw,
          address,
          phone_no,
        );

        res.status(201).json(newMerchant);
      } catch (error) {
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

  login: RequestHandler<MerchantLogin, unknown, unknown, unknown> = async (
    req,
    res,
    next,
  ) => {
    const phone_no = req.params.phone_no;
    const password = req.params.password;

    if (!phone_no) {
      throw createHttpError(400, 'Please enter a username');
    }

    const foundUser = await Merchant.findOne({
      phone_no: phone_no,
      password: password,
    });

    try {
      if (!foundUser) {
        throw createHttpError(404, "User doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  };
}
// For creating Merchant
