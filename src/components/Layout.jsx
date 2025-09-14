import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex w-full h-[100vh]">
      <div className=" flex w-1/5 h-[100vh] justify-center bg-black text-emerald-700  text-xl">
        {location.pathname.includes("dashboard") ? <Dashboard /> : <Profile />}
      </div>
      <div className="w-full bg-black ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
