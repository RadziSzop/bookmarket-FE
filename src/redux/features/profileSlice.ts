import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  profile: {
    email: string;
    role: "USER" | "ADMIN";
    profile: {
      name: string;
      extraContact?: {
        socialName: string;
        socialLink: string;
      }[];
    };
  } | null;
}

const initialState: Profile = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload.profile;
    },
    removeProfile: (state) => {
      state.profile = null;
    },
  },
});
export default profileSlice.reducer;
export const { setProfile, removeProfile } = profileSlice.actions;
