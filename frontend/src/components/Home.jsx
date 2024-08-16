import React, { useState, useEffect } from "react";
import axios_setup from "@/assets/Axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Home_Avatar,
  Profile_Avatar,
} from "./ui/avatar";
import { Bookmark, Favorite } from "@mui/icons-material";
import { MessageCircle, Send } from "lucide-react";

const Home = () => {
  const profile_story = [
    {
      profile_picture:
        "https://images.unsplash.com/photo-1722608274454-699ed706d7f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
    {
      profile_picture:
        "https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      name: "pk",
    },
  ];

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_setup.get("/");
        setData(res.data);
        console.log("Data fetched:", res.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen w-full flex flex-col p-2 md:pl-20">
      <div className="story cursor-pointer w-full md:w-[70%] overflow-x-auto scrollbar-hide flex items-center gap-5 p-2 md:px-24 scroll-smooth scroll-snap-x-mandatory scroll-snap-type-x mandatory ">
        {profile_story.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center scroll-snap-start text-base"
          >
            <Home_Avatar className=" transition-transform transform hover:scale-110 hover:shadow-lg">
              <AvatarImage src={profile.profile_picture} />
            </Home_Avatar>
            <p>{profile.name}</p>
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[70%] md:pl-32 ">
          {profile_story.map((items, index) => (
            <div
              key={index}
              className="bg-slate-300/10 p-2 rounded shadow-sm max-h-fit  h-fit bg-cover bg-center flex flex-col justify-center gap-2"
            >
              <div className="pl-10 flex gap-4 items-center">
                <Profile_Avatar className="w-8 h-8">
                  <AvatarImage src={items.profile_picture} />
                  <AvatarFallback>{items.name}</AvatarFallback>
                </Profile_Avatar>
                <h1>{items.name}</h1>
              </div>
              <img
                src={items.profile_picture}
                className="w-full h-auto rounded "
              />
              <div className="flex justify-between cursor-auto p-1">
                <div className="flex justify-center items-center gap-4">
                  <section className="relative text-lg group">
                    <Favorite />
                    <div className="absolute inset-10 text-lg hidden md:flex items-center justify-center bg-inherit bg-opacity-50 text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Likes
                    </div>
                  </section>

                  <section className="relative text-lg group">
                    <MessageCircle />
                    <div className="absolute inset-10 text-lg hidden md:flex items-center justify-center bg-inherit bg-opacity-50 text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Comments
                    </div>
                  </section>
                  <section className="relative text-lg group">
                    <Send />
                    <div className="absolute inset-10 text-lg hidden md:flex items-center justify-center bg-inherit bg-opacity-50 text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Share
                    </div>
                  </section>
                </div>
                <div>
                  <Bookmark />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
