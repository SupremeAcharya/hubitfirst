import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Layout2 = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <div className=" flex w-1/8 h-[100vh] justify-center bg-black text-emerald-700 text-xl">
        <Profile />
      </div>
      <div className="w-full bg-black">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout2;
