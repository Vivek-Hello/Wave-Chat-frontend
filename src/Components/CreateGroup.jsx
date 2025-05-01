import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../Store/groupStore.js";


const CreateGroup = ({ onClose, refreshGroups }) => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle checkbox toggle
  const handleUserSelect = (userId) => {
    setMembers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!groupName.trim()) return setError("Group name is required!");
    if (members.length === 0) return setError("Select at least one member!");

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("description", groupDescription);

    // Append each member separately
    members.forEach((member) => {
      formData.append("members[]", member);
    });

    if (groupImage) {
      formData.append("image", groupImage);
    }

    setIsLoading(true);
    try {
      await dispatch(createGroup(formData)); // Dispatch action
      refreshGroups(); // Refresh group list after creation ✅
      onClose(); // Close modal ✅
    } catch (err) {
      setError("Failed to create group. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-base-200 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="p-6 rounded-lg shadow-lg w-96 relative "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✖
        </button>

        {/* Modal Header */}
        <h1 className="text-xl font-semibold mb-4">Create Group</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Group Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Group Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Group Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Group Preview"
                className="w-24 h-24 object-cover rounded-md mt-2"
              />
            )}
          </div>

          {/* User Selection */}
          <div className="max-h-40 overflow-y-auto border rounded-md p-2">
            <h2 className="font-medium">Select Members:</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center p-2 rounded-md"
                >
                  <span>{user.userName || "User"}</span>
                  <input
                    type="checkbox"
                    checked={members.includes(user._id)}
                    onChange={() => handleUserSelect(user._id)}
                    className="accent-primary"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full btn btn-secondary rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Group"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
