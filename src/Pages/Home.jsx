import React, { useEffect } from "react";
import ContactContainer from "../Components/ContactContainer";
import ChatContainer from "../Components/ChatContainer";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../Store/authStore";


const Home = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getAllUsers());
   
  }, [dispatch]);

  return (
    <div className="h-full flex flex-col bg-base-200">
      {/* Error & Loading Messages */}



      {/* Main Layout */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar - Contacts */}
        <div className="w-full md:w-1/4 p-4 shadow-lg">
          <ContactContainer />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 shadow-lg">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
