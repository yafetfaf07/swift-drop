import { Types } from "mongoose";

// This is for creating Order
export interface OrderDTO {
    uid: Types.ObjectId;
    did: Types.ObjectId;
    pid:Types.ObjectId[];
}