import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckAuth, LogOutUser, Update_User } from "../Store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { AuthUser, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserName, setUpdatedUserName] = useState(AuthUser?.userName || "");
  const [updatedUserEmail, setUpdatedUserEmail] = useState(AuthUser?.email || "");
  const [updatedImage, setUpdatedImage] = useState(AuthUser?.image || null); // Store File
  const [imagePreview, setImagePreview] = useState(AuthUser?.image || null); // Store Preview URL

  const handleLogout = () => {
    dispatch(LogOutUser());
    navigate("/login");
  };

  // Handle image selection and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  useEffect(()=>{
   dispatch(CheckAuth());
  },[AuthUser])

  const handleSave = () => {
    const formData = new FormData();
    formData.append("userName", updatedUserName);
    formData.append("email", updatedUserEmail);
    if (updatedImage) formData.append("image", updatedImage);

    dispatch(Update_User(formData));
    setIsEditing(false);
  };

  if (!isAuth) {
    return <p className="text-center mt-10 text-red-500 font-bold">You must log in to view this page.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 shadow-xl p-6 animate-fadeIn">
        
        {/* User Avatar with Live Preview */}
        <div className="avatar flex justify-center relative">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imagePreview} alt="User Avatar" className="w-full h-full" />
          </div>
        </div>

        {/* User Info */}
        <div className="card-body text-center">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={updatedUserName}
                onChange={(e) => setUpdatedUserName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter new username"
              />
              <input
                type="email"
                value={updatedUserEmail}
                onChange={(e) => setUpdatedUserEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter new email"
              />

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-primary w-full"
                onChange={handleImageUpload}
              />  
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{AuthUser?.userName || "User"}</h1>
              <p className="text-gray-600">{AuthUser?.email}</p>
            </>
          )}

          {/* Edit Profile */}
          {isEditing ? (
            <div className="flex gap-2 justify-center mt-4">
              <button className="btn btn-success" onClick={handleSave}>Save</button>
              <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-outline btn-info mt-4" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}

          {/* Logout Button */}
          <button className="btn btn-error mt-4" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
