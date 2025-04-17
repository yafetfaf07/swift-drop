import { Schema } from 'mongoose';

// This is for creating a new merchant
export interface DeliverPersonnelDTO {
  id:Schema.Types.ObjectId,
  firstname:string,
  lastname:string,
  phone_no:string,
  password:string,
  address:{
    latitude:number,
    longitude:number
  }
}
export interface DeliverPersonnelLogin {
  phone_no:string;
  password:string;
}
// This is for changing profile
export interface ProfileChangeDTO {
    id:Schema.Types.ObjectId,
    firstname:string,
    lastname:string,
    phone_no:string,
    address:{
      latitude:number,
      longitude:number
    }
}

// This is for changing password
export interface PasswordChangeDTO {
    id:Schema.Types.ObjectId,
    password:string
}
