export interface User{
    name: string;
    email: string;
    _id: string;
    photo: string;
    role?:string;
    password:string
}
export interface Product{
  productId:string;
    name:string;
    category:string;
    price: number;
    _id: string;
    photos: string[];
    stock:number;
    dimension:string;
    model:string;
    brand:string;
    description:string;
    dimensions:string;
    productModel:string;
    tags:string[];
    displayPhoto:string[];
    photo:string;
    quantity:number;

}
export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    brand: string;
    dimension:string;
    model: string;
    category: string;
  };

  export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    name:string;
    phoneNumber: string;
    createdAt: string,
  };
  export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

  export type Order = {
    paymentMethod: '';
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    createdAt:string;
    user: {
      name: string;
      _id: string;
    };
    _id: string;
  };

  type LatestTransaction = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
  };

  export type Stats = {
    categoryCount: Record<string, number>[];
    changePercent: CountAndChange;
    count: CountAndChange;
    chart: {
      order: number[];
      revenue: number[];
    };
    userRatio: {
      male: number;
      female: number;
    };
    latestTransaction: LatestTransaction[];
  };

  export type Pie = {
    orderFullfillment: OrderFullfillment;
    productCategories: Record<string, number>[];
    stockAvailablity: {
      inStock: number;
      outOfStock: number;
    };
    revenueDistribution: RevenueDistribution;
    usersAgeGroup: UsersAgeGroup;
    adminCustomer: {
      admin: number;
      customer: number;
    };
  };
  
  export type Bar = {
    users: number[];
    products: number[];
    orders: number[];
  };
  export type Line = {
    users: number[];
    products: number[];
    discount: number[];
    revenue: number[];
  };
  
  type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
  };
  type OrderFullfillment = {
    processing: number;
    shipped: number;
    delivered: number;
  };
  
  type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  
  type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
  };
