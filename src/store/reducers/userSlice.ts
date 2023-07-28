import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TTokens } from '../../types';

type init = {
  tokens: TTokens;
};

const initialState: init = {
  tokens: { access_token: '', refresh_token: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTokens: (state, action: PayloadAction<TTokens>) => {
      state.tokens = action.payload;
    },
    removeTokens: (state) => {
      state.tokens = { access_token: '', refresh_token: '' };
    },
  },
});

export const { addTokens, removeTokens } = userSlice.actions;
export default userSlice.reducer;
