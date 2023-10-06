import { setToken as SetTokenState, Tokens } from "@/redux/features/tokenSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const Login = () => {
  const cookies = new Cookies();
  const token = cookies.get("token") as Tokens;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const setToken = async (token: Tokens) => {
      dispatch(SetTokenState(token));
      navigate("/books");
    };
    if (token) {
      setToken(token);
    }
  }, [token, navigate, dispatch]);

  return (
    <div className="container">
      <Loader2 className="animate-spin" />
    </div>
  );
};
