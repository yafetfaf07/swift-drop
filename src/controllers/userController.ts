import createHttpError from 'http-errors';
import user from '../models/User';
import { RequestHandler } from 'express';
// import * as argon2 from 'argon2'; // used for hashing password
import { UserDTO, LoginDTO } from '../dto/Userdto';
import { UserService } from '../services/UserService';

export class UserController {
  private __services: UserService;
  constructor(us: UserService) {
    this.__services = us;
  }
  createUser: RequestHandler<unknown, unknown, UserDTO, unknown> = async (
    req,
    res,
    next,
  ) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const passwordRaw = req.body.password;
    const address = req.body.address;
    const phone_no = req.body.phone_no;
    try {
      if (!firstname || !lastname || !passwordRaw || !address) {
        throw createHttpError(400, 'Please enter valid credentials ');
      }
      const existingUser = await this.__services.getUserByPhoneNumber(phone_no);
      if (existingUser) {
        throw createHttpError(409, 'This user already exists'); // conflict
      }
      // This is
      // const hashedPassword = await argon2.hash(passwordRaw);
      const newUser = await user.create({
        firstname: firstname,
        lastname: lastname,
        password: passwordRaw,
        address: address,
        phone_no: phone_no,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  login: RequestHandler<unknown, unknown, LoginDTO, unknown> = async (
    req,
    res,
    next,
  ) => {
    const phone_no = req.body.phone_no;
    const password = req.body.password;

    if (!phone_no || !password) {
      throw createHttpError(400, 'Please enter credentials');
    }
    try {
      const loginUser = await this.__services.login(phone_no, password);
      if (loginUser) {
        res.status(200).json(loginUser);
      } else {
        throw createHttpError(404, "User doesn't exist");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

//For Getting all Users

export const getAllUser: RequestHandler = async (req, res, next) => {
  const allUsers = await user.find().exec();

  try {
    if (!allUsers) {
      throw createHttpError(404, 'No users found');
    }

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// For Getting a specific user
