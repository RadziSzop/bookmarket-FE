import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokenSlice";
import profileReducer from "./features/profileSlice";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
