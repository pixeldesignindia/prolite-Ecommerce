import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../types/reducerTypes";
import { CartItem, ShippingInfo } from "../../src/types/types";


const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo:{} as ShippingInfo,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
    
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
    
      if (index !== -1) {
        // If item already exists in the cart, increment its quantity by 1
        state.cartItems[index].quantity += 1;
      } else {
        // If item is not present, add it to the cart
        state.cartItems.push(action.payload);
      }
    
      state.loading = false;
    
      // Recalculate prices
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 100;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 100;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    

    discountApplied: (state, action: PayloadAction<number | null>) => {
      if (action.payload !== null && action.payload !== undefined) {
        state.discount = action.payload;
      } else {
        state.discount = 0; 
      }
    },
    
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
