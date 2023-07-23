import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getRefreshtoken } from "../services";
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  // TODO
  useEffect(() => {
    const fetchData = async () => {
      const access_token = Cookies.get("access");
      const refresh_token = Cookies.get("refresh");
      if (!access_token && !refresh_token) {
        navigate("/login/");
        return;
      }
      if (!access_token && refresh_token) {
        try {
          const res = await getRefreshtoken(refresh_token);
          if(res){
            Cookies.set('access', res.data.access,{expires: 600/ 3600});
          }
        } catch (error) {
          navigate('/login/');
        }
      }
    }
    fetchData();
  }, []);
  
  return (
    <div>
      {location.pathname !== "/login/" ? <Header /> : <></>}
      <div className="px-2 md:px-8 mt-28">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
