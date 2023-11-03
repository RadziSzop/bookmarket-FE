import { setProfile, removeProfile } from "@/redux/features/profileSlice";
import { removeToken } from "@/redux/features/tokenSlice";
import { store } from "@/redux/store";
import { apiAuth } from "./axios";
import cookie from "js-cookie";
import { ProfileResponse } from "@/components/types/response";

export const getProfile = async (token: string) => {
  try {
    apiAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await apiAuth.get<ProfileResponse>("/profile");
    // store.dispatch(setProfile({ profile: data.response.data }));
  } catch (error) {
    console.log("get profile error: ", error);
    // cookie.remove("token");
    // store.dispatch(removeProfile());
    // store.dispatch(removeToken());
  }
};
