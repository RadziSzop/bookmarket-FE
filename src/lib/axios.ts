import { RefreshResponse } from "@/types/response";
import { setToken } from "@/redux/features/tokenSlice";
import { store } from "@/redux/store";
import axios from "axios";
import { getUnixTime } from "date-fns";
import { getProfile } from "./getProfile";
import cookie from "js-cookie";
import { logout } from "./logout";

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});

// interceptors
apiAuth.interceptors.request.use(async (config) => {
  try {
    const token = store.getState().token;
    // no token
    if (token.tokens === null) {
      await logout();
    }

    // Token is stale and can be refreshed
    else if (
      token.tokens.accessToken.expireDate <= getUnixTime(Date.now()) + 120 &&
      token.tokens.refreshToken.expireDate > getUnixTime(Date.now()) + 30
    ) {
      const response = await api.post<RefreshResponse>("auth/login/refresh", {
        accessToken: token.tokens.accessToken.token,
        refreshToken: token.tokens.refreshToken.token,
      });
      const newToken = response.data.response.data.token;
      store.dispatch(setToken({ tokens: newToken }));
      await getProfile(response.data.response.data.token.accessToken.token);
      cookie.set("token", JSON.stringify(newToken), {
        expires: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      config.headers.Authorization = `Bearer ${token.tokens.accessToken.token}`;
    }

    // Token is stale and cannot be refreshed
    else if (
      token.tokens.accessToken.expireDate <=
        getUnixTime(Date.now()) * 1000 + 120000 &&
      token.tokens.refreshToken.expireDate < getUnixTime(Date.now()) * 1000
    ) {
      logout();
    } else {
      config.headers.Authorization = `Bearer ${token.tokens.accessToken.token}`;
    }
    return config;
  } catch (error) {
    console.log("axios interceptor error: ", error);
    await logout();
    return config;
  }
});
