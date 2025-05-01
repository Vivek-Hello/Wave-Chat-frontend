import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser } from "../Store/authStore";
import { Link, useNavigate } from "react-router-dom";
import SignUpLoginDesigne from "../Components/SignUpLoginDesigne";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isAuth, isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignUpUser(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="grid grid-cols-2 justify-between items-center  h-screen">
      <div className=" flex flex-col justify-center items-center">
        <div className="text-3xl p-5 m-5 ">
          <h1 className="font-bold">Welcome to WaveChat</h1>
        </div>
      <div className="shadow-2xl rounded-lg px-8 py-6 flex flex-col justify-center items-center w-96">
        <h1 className="text-blue-500 text-3xl font-bold mt-3 mb-6">Sign Up</h1>

        {/* Display error message if signup fails */}
        {error && (
          <div className="w-full mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form
          className="w-full flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* Username Input */}
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              minLength="3"
              maxLength="30"
              title="Only letters"
              className="w-full rounded-md"
              onChange={handleChange}
              value={formData.userName}
              required
            />
          </label>
          <p className="text-xs text-gray-500">
            Must be 3 to 30 characters, containing only letters, numbers, or dashes.
          </p>

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
              className="w-full rounded-md"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </label>

          {/* Password Input */}
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
                <rect width="18" height="11" x="3" y="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </g>
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-md"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </label>
          <p className="text-xs text-gray-500">
            Must be at least 8 characters, including a number or symbol.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Already Have an Account? */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      </div>
     
      <SignUpLoginDesigne />
    </div>
  );
};

export default SignUp;