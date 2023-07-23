import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { authGoogleLogin } from "../../services";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Login() {
  const navigate = useNavigate();

  const handleLogin = async (token) => {
    try {
      const res = await authGoogleLogin(token);
      if (res.status === 200) {
        Cookies.set("access", res.data.access, { expires: (600 / 24) * 3600 });
        Cookies.set("refresh", res.data.refresh, { expires: 7 });
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed!");
    }
  };
  return (
    <div className="w-4/5 md:w-[500px] h-[300px] mx-auto border-2 rounded-md p-4 shadow-md ">
      <div>
        <h2 className="text-2xl leading-8 font-semibold">Sign in to continue</h2>
      </div>

      <div className="flex justify-center mt-20">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleLogin(credentialResponse.credential);
          }}
          onError={() => {
            toast.error("Login failed!");
          }}
        />
      </div>
    </div>
  );
}

export default Login;
