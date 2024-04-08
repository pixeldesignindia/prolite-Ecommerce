import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../types/reducerTypes";
import { CartItem, ShippingInfo } from "../../src/types/types";
import toast from "react-hot-toast";


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

      const { productId, quantity, stock } = action.payload;

      const index = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      // If the product is already in the cart
      if (index !== -1) {
        const newQuantity = state.cartItems[index].quantity + quantity;

        // Check if adding more exceeds the available stock
        if (newQuantity > stock) {
          toast.error("Cannot add more, Exceeds available stock.");
          state.loading = false;
          return;
        }

        state.cartItems[index].quantity = newQuantity;
        toast.success("Added to cart.");
      } else {
        toast.success("Added to cart.");
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
    incrementCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
    
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload
      );
    
      if (index !== -1) {
        const cartItem = state.cartItems[index];
    
        if (cartItem.quantity < cartItem.stock) {
          // Increment the quantity if it's less than the stock
          cartItem.quantity += 1;
    
          // Recalculate prices
          state.subtotal = state.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
    
          state.shippingCharges = state.subtotal > 1000 ? 0 : 100;
          state.tax = Math.round(state.subtotal * 0.18);
          state.total =
            state.subtotal + state.tax + state.shippingCharges - state.discount;
        } else {
          // Show a toast message indicating maximum stock reached
          toast.error("Maximum stock reached for this item.");
        }
      }
    
      state.loading = false;
    },
    

    
    decrementCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload
      );

      if (index !== -1 && state.cartItems[index].quantity > 0) {
        state.cartItems[index].quantity -= 1;
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
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
