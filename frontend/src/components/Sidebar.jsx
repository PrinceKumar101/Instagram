import React, { useEffect, useState } from "react";
import { HomeOutlined, Home, Search, SearchOutlined, Explore, ExploreOutlined } from "@mui/icons-material"; // Import both icons
import { NavLink } from "react-router-dom";
import { Project_name } from "@/assets/Project_variable";

const Sidebar = () => {
  const [display_name, setdisplay_name] = useState();
  useEffect(() => {
    if(Project_name){
      setdisplay_name(Project_name)
    }
    else{
      setdisplay_name("Default project name")
    }
  }, [Project_name]);
  const Navbar_elements = [
    {
      text: "Home",
      icon: <HomeOutlined />, // Outlined icon for inactive state
      activeIcon: <Home />, // Filled icon for active state
      path: "/", // Add a path for the NavLink
    },
    {
      text: "Search",
      icon: <SearchOutlined/>, // Outlined icon for inactive state
      activeIcon: <Search/>, // Filled icon for active state
      path: "/search", // Add a path for the NavLink
    },
    {
      text: "Explore",
      icon: <ExploreOutlined/>, // Outlined icon for inactive state
      activeIcon: <Explore />, // Filled icon for active state
      path: "/explore", // Add a path for the NavLink
    },
    {
      text: "Sign Up",
      icon: <HomeOutlined />, // Outlined icon for inactive state
      activeIcon: <Home />, // Filled icon for active state
      path: "/signup", // Add a path for the NavLink
    },
  ];

  return (
    <>
      <div className=" w-full bg-inherit h-screen pt-20 ">
        <div className="flex flex-col w-fit pl-6 text-xl font-semibold pb-10">
          <NavLink to="/">
          <h1>{display_name}</h1>
          </NavLink>
        </div>
        <div className="  flex flex-col w-fit pl-10 gap-6 text-lg">
          {Navbar_elements.map((item, index) => {
            return (
              <>
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isActive ? " underline" : "text-gray-500"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? item.activeIcon : item.icon}
                      <span className="ml-2">{item.text}</span>
                    </>
                  )}
                </NavLink>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
