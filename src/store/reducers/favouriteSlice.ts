import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

type Init = {
  favourites: Product[];
};

const initialState: Init = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      // state.favourites.push(action.payload);
      const exist = state.favourites.some(f=> f.id === action.payload.id);
      !exist && state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
