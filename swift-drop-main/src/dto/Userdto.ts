import { Schema } from "mongoose";

// This is for creating a user
export interface UserDTO {
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

// This is for login
export interface LoginDTO {
    phone_no:string,
    password:string

}

//This is for changing profile
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
