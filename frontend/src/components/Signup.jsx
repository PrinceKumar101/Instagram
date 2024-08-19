import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Project_name } from "../assets/Project_variable";
import { useForm } from "react-hook-form";
import axios_setup from "@/assets/Axios";

const Signup = () => {
  const [display_name, setdisplay_name] = useState("Default Project Name");
  const [error, seterror] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (Project_name) {
      setdisplay_name(Project_name);
    }
  }, [Project_name]);

  const handleRegistration = async (data) => {
    try {
      const res = await axios_setup.post("/signup", data);
      setResponseMessage(res.data.message);
      if (res.data.success) {
        navigate("/profile", { state: { message: "Signup successful" } });
      }
    } catch (err) {
      if (err.response) {
        seterror(err.response.data.message || "An unexpected error occurred.");
      } else {
        seterror("Network error or server not reachable.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center bg-inherit p-4">
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md border border-slate-300 shadow-md p-6 bg-white">
        <div>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">{display_name}</h1>
            <p className="text-gray-600 mt-2">
              Sign up to see photos and videos <br /> from your friends.
            </p>
            {error && <div className="text-xl pl-20 text-red-500">{error}</div>}
            {responseMessage && !error && (
              <div className="text-xl pl-20 text-green-500">
                {responseMessage}
              </div>
            )}
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
            className="space-y-4"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Mobile number or email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              {...register("name", { required: "Full Name is required" })}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
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
    </div>
  );
};

export default Signup;
