import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  Home,
  Search,
  SearchOutlined,
  Explore,
  ExploreOutlined,
  Favorite,
  FavoriteOutlined,
  AddBox,
  AddBoxOutlined,
} from "@mui/icons-material"; // Import both icons
import { MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Project_name } from "@/assets/Project_variable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const [display_name, setdisplay_name] = useState();
  useEffect(() => {
    if (Project_name) {
      setdisplay_name(Project_name);
    } else {
      setdisplay_name("Default project name");
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
      icon: <SearchOutlined />, // Outlined icon for inactive state
      activeIcon: <Search />, // Filled icon for active state
      path: "/search", // Add a path for the NavLink
    },
    {
      text: "Explore",
      icon: <ExploreOutlined />, // Outlined icon for inactive state
      activeIcon: <Explore />, // Filled icon for active state
      path: "/explore", // Add a path for the NavLink
    },
    {
      text: "Message",
      icon: <MessageCircle />, // Outlined icon for inactive state
      activeIcon: <MessageCircle />, // Filled icon for active state
      path: "/message", // Add a path for the NavLink
    },
    {
      text: "Notification",
      icon: <FavoriteOutlined />, // Outlined icon for inactive state
      activeIcon: <Favorite />, // Filled icon for active state
      path: "/Notification", // Add a path for the NavLink
    },
    {
      text: "Create",
      icon: <AddBoxOutlined />, // Outlined icon for inactive state
      activeIcon: <AddBox />, // Filled icon for active state
      path: "/create_new_post", // Add a path for the NavLink
    },
    {
      text: "Profile",
      icon: (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      ),
      activeIcon: (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      ), // Filled icon for active state
      path: "/profile", // Add a path for the NavLink
    },
    {
      text: "Login",
      icon: <AddBoxOutlined />, // Outlined icon for inactive state
      activeIcon: <AddBox />, // Filled icon for active state
      path: "/login", // Add a path for the NavLink
    },
    {
      text: "Sign Un",
      icon: <AddBoxOutlined />, // Outlined icon for inactive state
      activeIcon: <AddBox />, // Filled icon for active state
      path: "/sign_up", // Add a path for the NavLink
    },
  ];

  return (
    <>
    <div className="w-full bg-inherit h-screen pt-20">
      <div className="flex flex-col w-fit pl-6 text-xl font-semibold pb-10">
        <NavLink to="/">
          <h1>{display_name}</h1>
        </NavLink>
      </div>
      <div className="flex flex-col w-fit pl-10 gap-6 text-lg">
        {Navbar_elements.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center hover:bg-slate-300 rounded-md p-2 ${
                isActive ? "underline" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? item.activeIcon : item.icon}
                <span className="ml-2 hidden sm:inline md:hidden lg:inline">
                  {item.text}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      
    </div>

    <div className="w-full bg-inherit h-screen pt-20 md:hidden ">
      <div className="flex flex-col w-fit pl-6 text-xl font-semibold pb-10">
        <NavLink to="/">
          <h1>{display_name}</h1>
        </NavLink>
      </div>
      <div className="flex flex-col w-fit pl-10 gap-6 text-lg">
        {Navbar_elements.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center hover:bg-slate-300 rounded-md p-2 ${
                isActive ? "underline" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? item.activeIcon : item.icon}
                
              </>
            )}
          </NavLink>
        ))}
      </div>

      
    </div>

    </>
  );
};

export default Sidebar;
