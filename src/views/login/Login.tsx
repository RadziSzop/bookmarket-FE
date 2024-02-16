import cookie from "js-cookie";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Token } from "@/types/response";
import { setToken } from "@/redux/features/tokenSlice";
import { getProfile } from "@/lib/getProfile";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokensCookie = cookie.get("token");
  useEffect(() => {
    if (tokensCookie && dispatch) {
      const Login = async () => {
        const tokens = JSON.parse(tokensCookie) as Token;
        dispatch(setToken({ tokens: tokens }));
        await getProfile(tokens.accessToken.token);
        console.log({
          a: new Date().getTime(),
          b: tokens.refreshToken.expireDate,
        });

        if (new Date().getTime() < tokens.refreshToken.expireDate) {
          navigate("/");
        } else throw new Error("Token expired");
      };
      Login().catch((error) => {
        console.log("Login error: ", error);
        cookie.remove("token");
        toast.error("Login error, please try again.");
        navigate("/");
      });
    } else {
      cookie.remove("token");
      console.log("Login error: ", "No token found");
      navigate("/");
    }
  }, [dispatch, tokensCookie, navigate]);
  return (
    <div>
      <Loader2 size={60} className="fixed left-1/2 top-1/2 animate-spin" />
    </div>
  );
};
