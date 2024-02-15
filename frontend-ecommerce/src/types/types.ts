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
    photos: string[];
    stock:number;
    dimension:string;
    model:string;
    brand:string
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
