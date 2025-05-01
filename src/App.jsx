import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import AuthChecker from "./Components/AuthChecker";
import Home from "./Pages/Home"; 
import Profile from "./Pages/Profile";
import Themes from "./Pages/Themes";
import useSocketSetup from "./hooks/useSocketSetup.js"; 

const App = () => {
  const { isAuth, AuthUser } = useSelector((state) => state.auth); 

  useSocketSetup(isAuth, AuthUser); // ✅ Custom hook handles real-time socket connection

  return (
    <div className="h-screen w-screen">
      <AuthChecker /> 
      <Navbar />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={isAuth ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={isAuth ? <Navigate to="/" /> : <LogIn />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/themes" element={isAuth ? <Themes /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
