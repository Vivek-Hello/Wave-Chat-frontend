import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const UserSearchModal = ({ isOpen, onClose, onSelect, excludeUsers = [] }) => {
  const { users } = useSelector((state) => state.user); // assuming user list is in Redux
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const excludedIds = new Set(excludeUsers.map((u) => u._id));
    const matched = users.filter(
      (user) =>
        !excludedIds.has(user._id) &&
        user.userName?.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(matched);
  }, [searchQuery, users, excludeUsers]);

  const toggleUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddUsers = () => {
    if (selectedUserIds.length === 0) {
      toast.error("Select at least one user");
      return;
    }

    onSelect(selectedUserIds);
    setSearchQuery("");
    setFilteredUsers([]);
    setSelectedUserIds([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="bg-white rounded-xl p-6 w-full max-w-md z-10 shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Add Members</Dialog.Title>

          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full mb-4"
          />

          <div className="max-h-48 overflow-y-auto space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`p-2 border rounded cursor-pointer flex justify-between items-center ${
                  selectedUserIds.includes(user._id) ? "bg-blue-100" : ""
                }`}
                onClick={() => toggleUser(user._id)}
              >
                <span>{user.userName}</span>
                {selectedUserIds.includes(user._id) && (
                  <span className="text-sm text-blue-600">Selected</span>
                )}
              </div>
            ))}

            {searchQuery && filteredUsers.length === 0 && (
              <p className="text-sm text-gray-500">No users found</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAddUsers}>
              Add
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UserSearchModal;
