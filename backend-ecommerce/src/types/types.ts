import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface NewProductRequestBody {
  name: string;
  category: string;
  photo: string;
  stock: number;
  price: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;


export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}
export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  address?:boolean;
  shippingAddress?:boolean;
  admin?: boolean;
  userId?: string;
  addressId?: string;
  orderId?: string;
  productId?: string | string[];
};

export interface newAdressRequestBody{
  address: string;
  state: string;
  city: string;
  country: string;
  pinCode: number;
  user: string;
  name: string;
  phoneNumber:number;
}
export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};
export interface NewOrderRequestBody {
  shippingInfo:string;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  paymentMethod: string;
  orderItems: OrderItemType[];
}