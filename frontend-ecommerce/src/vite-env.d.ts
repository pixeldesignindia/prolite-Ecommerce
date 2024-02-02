/// <reference types="vite/client" />
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity:number
  }
  interface CartState {
    items: Product[];
  }
  
  interface RootState {
    cart: CartState;
  }