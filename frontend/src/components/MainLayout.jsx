import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex gap-3 bg-primary_color">
        <div className="w-1/6 bg-slate-50 h-full fixed ">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col items-center justify-center pt-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
