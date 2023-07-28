import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, updProduct } from '../../types';

type init = {
  recents: Product[];
};
const initialState: init = {
  recents: [],
};

const recentSlice = createSlice({
  name: 'recents',
  initialState,
  reducers: {
    addToRecents: (state, action: PayloadAction<updProduct>) => {
      state.recents.push(action.payload);

      // localStorage.setItem('recents', JSON.stringify(action.payload));
    },
  },
});

export default recentSlice.reducer;
export const { addToRecents } = recentSlice.actions;
