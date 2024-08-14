import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project_name } from "../assets/Project_variable";
import { useForm } from "react-hook-form";
import axios_setup from "@/assets/Axios";

const Signup = () => {
  const [display_name, setdisplay_name] = useState();
  const { register, handleSubmit } = useForm();

  const [data, setdata] = useState(null);
  const [error, seterror] = useState(null);

  useEffect(() => {
    if (Project_name) {
      setdisplay_name(Project_name);
    } else {
      setdisplay_name("Default Project Name");
    }
  }, [Project_name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_setup.get("/signup");
        setdata(res.data);
        console.log("Data fetched:", res.data);
      } catch (error) {
        seterror(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-xl pl-20 ">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-inherit p-4">
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md border border-slate-300 shadow-md p-6 bg-white">
        <div>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">{display_name}</h1>
            <p className="text-gray-600 mt-2">
              Sign up to see photos and videos <br /> from your friends.
            </p>
            <button className="bg-blue-500 p-2 flex items-center justify-center gap-2 text-white text-lg hover:bg-blue-700 rounded-lg w-full mt-4">
              <i className="ri-facebook-box-line text-2xl"></i>
              <span>Log in with Facebook</span>
            </button>
            <div className="flex items-center my-4">
              <hr className="w-full border-t border-gray-300" />
              <span className="px-2 text-gray-500">OR</span>
              <hr className="w-full border-t border-gray-300" />
            </div>
          </div>

          <form
            action="/signup"
            onSubmit={handleSubmit((data) => console.log(data))}
            className="space-y-4"
          >
            <input
              {...register("email")}
              type="email"
              placeholder="Mobile number or email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Sign up
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-4">
            By signing up, you agree to our Terms, Data Policy, and Cookies
            Policy.
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md border border-slate-300 shadow-md p-4 mt-4 bg-white text-center">
        <p>
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold">
            Log in
          </Link>
        </p>
      </div>

      <div className="text-center mt-4 text-gray-500 text-sm">
        <p>Get the app.</p>
        <div className="flex justify-center space-x-2 mt-2">
          <Link to="#">
            <img
              src="https://www.instagram.com/static/images/appstore-badge.png/3e87cde9545a.png"
              alt="App Store"
              className="h-10"
            />
          </Link>
          <Link to="#">
            <img
              src="https://www.instagram.com/static/images/playstore-badge.png/aa56e6d5c6f5.png"
              alt="Play Store"
              className="h-10"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
