import { Schema } from 'mongoose';

// This is for creating a new merchant
export interface MerchantDTO {
  id:Schema.Types.ObjectId,
  firstname:string,
  lastname:string,
  phone_no:string,
  password:string,
  address:[number]
}
export interface MerchantLogin {
  phone_no:string;
  password:string;
}
// This is for changing profile
export interface ProfileChangeDTO {
    id:Schema.Types.ObjectId,
    firstname:string,
    lastname:string,
    phone_no:string,
    address:[number]
}

// This is for changing password
export interface PasswordChangeDTO {
    id:Schema.Types.ObjectId,
    password:string
}
