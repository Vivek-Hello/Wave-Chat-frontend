import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, setSelectedUser } from "../Store/authStore";
import SidebarSkeleton from "./SidebarSkeleton";

const ContactContainer = () => {
  const dispatch = useDispatch();
  const { users, isLoading, errorMessage, selectedUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Recently";
    const date = new Date(timestamp);
    return isNaN(date) ? "Recently" : date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-base-200 rounded-lg relative p-4">
      {/* Header */}
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-semibold">Contacts</h1>
      </div>

      {/* User List */}
      <div className="w-full h-full">
        {isLoading && <div className="text-center text-gray-500"><SidebarSkeleton /></div>}
        {errorMessage && <div className="text-center text-red-500">{errorMessage}</div>}
        {!isLoading && users?.length === 0 && <div className="text-center text-gray-500">No One in the Contact</div>}

        <div className="flex flex-col gap-3">
          {users?.map((user) => (
            <div
              key={user._id}
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-base-100 shadow-md cursor-pointer ${
                selectedUser?._id === user._id ? "bg-base-100" : ""
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <div className="relative">
                <img
                  src={user.profilePicture || user.image || "/default-avatar.png"}
                  alt={user.userName || "User"}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold">{user.userName || "Unknown User"}</h1>
                <span className="text-sm text-gray-500">
                  {user.isOnline ? "Online now" : `Last seen ${formatLastSeen(user.lastSeen)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
