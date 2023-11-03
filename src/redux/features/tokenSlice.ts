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
    setToken: (state, action: PayloadAction<{ tokens: Tokens }>) => {
      state.tokens = action.payload.tokens;
    },
    removeToken: (state) => {
      state.tokens = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
