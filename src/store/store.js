import { configureStore } from '@reduxjs/toolkit';
import userSlice from './users/usersSlice';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export default store;
