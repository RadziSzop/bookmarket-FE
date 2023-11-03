import { removeProfile } from "@/redux/features/profileSlice";
import { removeToken } from "@/redux/features/tokenSlice";
import { store } from "@/redux/store";
import cookie from "js-cookie";
export const logout = async () => {
  store.dispatch(removeToken());
  store.dispatch(removeProfile());
  cookie.remove("token");
  window.location.href = "/";
};
