import React, { useEffect, useState } from "react";
import { Profile_Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { AddOutlined } from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios_setup from "@/assets/Axios";

const Profile = () => {
  const insideProfileLink = [
    {
      to: "/profile/post",
      text: "Posts",
    },
    {
      to: "/profile/saved",
      text: "Saved",
    },
    {
      to: "/profile/tagged",
      text: "Tagged",
    },
  ];

  const [data, setdata] = useState();
  const [error, seterror] = useState("");

  useEffect(() => {
    seterror("");
    const fetchData = async () => {
      try {
        const res = await axios_setup.get("/profile");
        setdata(res.data);
      } catch (error) {
        console.error("Error fetching data:", seterror(error));
      }
    };

    fetchData();
  }, []);

  if (error.length > 0) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="main flex flex-col gap-5">
        <div className="first_section flex justify-center items-center gap-10 flex-wrap w-full">
          <div className="">
            <Profile_Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Profile_Avatar>
          </div>
          <div className="md:text-2xl text-xl flex items-center justify-center flex-wrap gap-3">
            <h2>101_Prince_kumar</h2>
            <Button className=" text-xs md:text-sm" variant="Profile_button">
              Edit Profile
            </Button>
            <Button className=" text-xs md:text-sm" variant="Profile_button">
              View archive
            </Button>

            <div className=" flex w-full justify-center items-center gap-10 text-lg tracking-wide">
              <h1>10 Followers</h1>
              <h1>10 Following</h1>
            </div>
          </div>

          <div className="hidden md:block w-1/2">
            <h2 className="text-left text-2xl font-semibold tracking-wider">
              Prince
            </h2>
          </div>
        </div>

        <div className=" second_section flex justify-center md:justify-start md:pl-32 ">
          <div className="second_section w-36 h-36 bg-slate-200 cursor-pointer rounded-full flex items-center justify-center opacity-85 border border-slate-700  shadow-lg shadow-slate-400">
            <AddOutlined sx={{ fontSize: 50, width: 100, height: 100 }} />
          </div>
        </div>

        <div className="third_section flex flex-col justify-around items-center w-full md:px-36">
          <div className="flex justify-around items-center gap-10 border-b border-slate-300 w-full md:px-52 ">
            {insideProfileLink.map((items, index) => (
              <Link
                key={index}
                to={items.to}
                className="md:text-2xl text-xl font-thin tracking-wide hover:bg-slate-200 rounded-lg px-2 py-1"
                variant="ghost"
              >
                {items.text}
              </Link>
            ))}
          </div>
          <div className="flex justify-start flex-wrap w-1/2 gap-5 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
