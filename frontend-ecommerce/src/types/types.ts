export interface User{
    name: string;
    email: string;
    gender: string;
    _id: string;
    photo: string;
    role?:string;
    dob: string;
}
export interface Product{
    name:string;
    category:string;
    price: number;
    _id: string;
    photo: string;
    stock:number;
}
export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };

  export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

  export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
      name: string;
      _id: string;
    };
    _id: string;
  };
