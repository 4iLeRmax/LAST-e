import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import favouriteReducer from './reducers/favouriteSlice';
import recentReducer from './reducers/recentSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouriteReducer,
    recents: recentReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
