import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {toast} from "react-toastify"
import { authGoogleLogin } from "../../services";
import {useNavigate} from "react-router-dom"
import useDataContext from "../../context/useDataContext";
import Cookies from "js-cookie";
function Login() {
  const navigate = useNavigate();
  const {isFetchUser,setIsFetchUser} = useDataContext();

  const handleLogin = async (token) => {
    // try {
    //   const res = await authGoogleLogin(token);
    //   if(res.status === 200){
    //     Cookies.set('access', res.data.access, {expires: 600/ 24 * 3600});
    //     Cookies.set('refresh', res.data.refresh, {expires: 7 })
    //     setIsFetchUser(!isFetchUser);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast.error("Login failed!");
    // }
    setIsFetchUser(!isFetchUser);
  }
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse.credential);
        }}
        onError={() => {
          toast.error("Login failed!");
        }}
      />
      ;
    </div>
  );
}

export default Login;
