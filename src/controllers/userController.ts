import createHttpError from 'http-errors';
import user from '../models/User';
import { RequestHandler } from 'express';
import * as argon2 from 'argon2'; // used for hashing password
import {UserDTO} from "../dto/Userdto";

// For creating user
export const createUser: RequestHandler<
  unknown,
  unknown,
  UserDTO,
  unknown
> = async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const passwordRaw = req.body.password;
  const address = req.body.address;
  const phone_no=req.body.phone_no;
  try {
    if (!firstname || !lastname || !passwordRaw || !address) {
      throw createHttpError(400, 'Please enter valid credentials ');
    }
    const existingUser = await user
      .findOne({
        phone_no:phone_no ,
      })
      .exec();
    if (existingUser) {
      throw createHttpError(409, 'This user already exists'); // conflict
    }
    // This is 
    // const hashedPassword = await argon2.hash(passwordRaw);
    const newUser = await user.create({
      firstname: firstname,
      lastname: lastname,
      password: passwordRaw,
      address:address,
      phone_no:phone_no
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//For getiing notes from user
export const getNotesfromUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await user.findById(id).populate('notes');
    if (!users) {
      throw createHttpError(404, 'No notes found');
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// interface UserId {
//     id?:string
// }
// interface createNotes {
//     title?:string,
//     text?:string
// }
// For creating notes in a user instance
// export const createNoteForUser: RequestHandler<UserId,unknown,createNotes,unknown>= async (req, res, next) => {
//   const id = req.params.id;
//   const title = req.body.title;
//   const text = req.body.text;
//   try {
//     const getUser = await user.findById(id).exec();

//     if (!getUser) {
//       throw createHttpError(404, "The user doesn't exitst");
//     }
//     if (!title || !text) {
//       throw createHttpError(400, 'There must be a title and a text');
//     }
//     const newNotes = await notes.create({text:text, title:title})

//     const savedNote = await newNotes.save();
//         getUser.notes.push(savedNote.id)
//         await getUser.save();
        
//         res.status(201).json(savedNote);
  
//   } catch (error) {
//     next(error);
//   }
// };

//For Getting all Users

export const getAllUser:RequestHandler = async(req,res,next) => {

  const allUsers = await user.find().exec();

  try {
    if(!allUsers) {
      throw createHttpError(404, "No users found");
    }

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
}

// For Getting a specific user

export const login:RequestHandler=async(req,res,next) => {
  const usernames=req.params.username;

  if(!usernames) {
    throw createHttpError(400, "Please enter a username");
  }

  const foundUser = await user.findOne({usernames});

  try {
    if(!foundUser) {
      throw createHttpError(404,"User doesn't exist")
    }

  } catch (error) {
    next(error);
  }


}

