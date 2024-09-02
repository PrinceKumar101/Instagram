import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import { Project_name } from "../assets/Project_variable";
import axios_setup from "@/assets/Axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const [display_name, setdisplay_name] = useState();
  const [responseMessage, setresponseMessage] = useState();
  const [error, seterror] = useState();
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (Project_name) {
      setdisplay_name(Project_name);
    } else {
      setdisplay_name("Default Project Name");
    }
  }, [Project_name]);

  const handellogin = async (data) => {
    try {
      const res = await axios_setup.post("/login", data);
      setresponseMessage(res.data.message);
      if (res.data.success) {
        navigate("/profile", { state: { message: "Signup successful" } });
      }
    } catch (err) {
      console.error("Error during login:", err); // Log full error object for debugging
      if (err.response) {
        seterror(err.response.data.message || "An unexpected error occurred.");
      } else {
        seterror("Network error or server not reachable.");
      }
    }
  };

  
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center p-4 bg-inherit">
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md border  shadow-xl p-6 bg-inhert">
      {error && <div className="text-xl pl-20 text-red-500">{error}</div>}
            {responseMessage && !error && (
              <div className="text-xl pl-20 text-green-500">
                {responseMessage}
              </div>
            )}
        <form onSubmit={handleSubmit(handellogin)}>
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

          <div className="space-y-4">
            <input

              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Mobile number or email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Log In
            </button>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            By signing up, you agree to our Terms, Data Policy, and Cookies Policy.
          </p>
        </form>
      </div>

      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md border border-slate-300 shadow-md p-4 mt-4 bg-white text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/sign_up" className="text-blue-500 font-bold">
            Sign In
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

export default Login;
