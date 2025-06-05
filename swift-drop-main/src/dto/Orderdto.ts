import { Types } from 'mongoose';

// This is for creating Order
export interface OrderDTO {
  uid: Types.ObjectId;
  pid: Types.ObjectId[];
}

export interface OrderDTOs {
  uid: Types.ObjectId;
  product: [
    {
      pid: Types.ObjectId;

      quantity: number;
    },
  ];
}
