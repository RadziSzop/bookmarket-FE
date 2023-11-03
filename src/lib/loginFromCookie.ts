import { Tokens, removeToken, setToken } from "@/redux/features/tokenSlice";
import { store } from "@/redux/store";
import { getProfile } from "./getProfile";
import cookie from "js-cookie";
import { removeProfile } from "@/redux/features/profileSlice";

export const loginFromCookie = async () => {
  try {
    const tokens = cookie.get("token")
      ? (JSON.parse(cookie.get("token")!) as Tokens)
      : null;
    console.log({ tokens });

    if (tokens) {
      store.dispatch(setToken({ tokens: tokens }));
      await getProfile(tokens.accessToken.token);
    }
  } catch (error) {
    console.log("login from cookie error: ", error);
    // cookie.remove("token");
    // store.dispatch(removeProfile);
    // store.dispatch(removeToken);
  }
};
