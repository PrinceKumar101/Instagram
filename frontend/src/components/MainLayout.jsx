import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Bottombar from "./Bottombar";

const MainLayout = () => {
  console.log("Mainlayout");

  return (
    <>
      <div className="hidden gap-3 bg-primary_color md:flex ">
        <header className="w-1/6 bg-slate-50 h-full sticky top-0 ">
          <Sidebar />
        </header>
        <main className="w-full flex flex-col pt-5 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <div className="flex flex-col h-full md:hidden">
        <header className="fixed top-0 left-0 right-0 w-full z-10">
          <Topbar />
        </header>
        <main className="flex-grow overflow-y-auto pt-16 pb-16">
          <Outlet />
        </main>
        <footer className="fixed bottom-0 left-0 right-0 w-full z-10">
          <Bottombar />
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
