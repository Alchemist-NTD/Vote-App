import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <Header />
      <div className="px-8 mt-28">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
