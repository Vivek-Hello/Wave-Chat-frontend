import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogInUser } from "../Store/authStore.js";
import { Link, useNavigate } from "react-router-dom";
import SignUpLoginDesigne from "../Components/SignUpLoginDesigne.jsx";

const LogIn = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LogInUser(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="grid grid-cols-2 justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl p-5 m-5 ">
          <h1 className="font-bold">Welcome to WaveChat</h1>
        </div>

        <div className="shadow-2xl rounded-lg px-8 py-6 flex flex-col justify-center items-center w-96">
          <h1 className="text-blue-500 text-3xl font-bold mt-3 mb-6">Log In</h1>

          <form
            className="w-full flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            {/* Email Input */}
            <label className="input flex items-center w-full">
              <svg
                className="h-[1em] opacity-50 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                className="w-full p-2  rounded-md "
                onChange={handleChange}
                value={formData.email}
                required
              />
            </label>

            {/* Password Input */}
            <label className="input w-full">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2  rounded-md "
                onChange={handleChange}
                value={formData.password}
                required
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Signup Prompt */}
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <SignUpLoginDesigne />
    </div>
  );
};

export default LogIn;
