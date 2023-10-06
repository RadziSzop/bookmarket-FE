import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  tokens: {
    accessToken: {
      token: string;
      expireDate: number;
    };
    refreshToken: {
      token: string;
      expireDate: number;
    };
  } | null;
}

const initialState: TokenState = {
  tokens: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      state = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
