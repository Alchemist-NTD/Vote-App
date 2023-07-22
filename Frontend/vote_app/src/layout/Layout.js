import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
function Layout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== '/login/' ? <Header /> : <></>}
      <div className="px-2 md:px-8 mt-28">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
