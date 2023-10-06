import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tokens {
  accessToken: {
    token: string;
    expireDate: number;
  };
  refreshToken: {
    token: string;
    expireDate: number;
  };
}
export interface TokenState {
  tokens: Tokens | null;
}

const initialState: TokenState = {
  tokens: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
