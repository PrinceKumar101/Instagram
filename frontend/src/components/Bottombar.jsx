import React from 'react';
import {
  HomeOutlined,
  Home,
  Explore,
  ExploreOutlined,
  AddBox,
  AddBoxOutlined,
} from "@mui/icons-material"; // Import both icons
import { MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Bottombar = () => {
  const Navbar_elements = [
    {
      text: "Home",
      icon: <HomeOutlined />, // Outlined icon for inactive state
      activeIcon: <Home />, // Filled icon for active state
      path: "/", // Add a path for the NavLink
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
  ];

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 md:top-0 md:bottom-auto bg-slate-200 flex flex-row justify-around items-center gap-4 text-sm sm:text-base md:text-lg p-2 md:rounded-none rounded-t-md">
        {Navbar_elements.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex items-center p-1 sm:p-2"
          >
            {({ isActive }) => <>{isActive ? item.activeIcon : item.icon}</>}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Bottombar;
