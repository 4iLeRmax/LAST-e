import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

export type cartItem = {
  quantity: number;
} & Product;

type Init = {
  cart: cartItem[];
};

const initialState: Init = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === action.payload.id);

      if (found)
        newCart = newCart.map((item) =>
          item.id === action.payload.id && item.quantity >= 1 && item.quantity < 9
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      else newCart.push({ ...action.payload, quantity: 1 });

      state.cart = newCart;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    toggleQuantity: (state, action: PayloadAction<cartItem>) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

export const { addToCart, removeFromCart, toggleQuantity } = cartSlice.actions;
export default cartSlice.reducer;
