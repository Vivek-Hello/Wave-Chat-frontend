import React from "react";

const GroupInfoModal = ({ isOpen, onClose, group, isAdmin, onLeaveGroup, onAddMembers }) => {
  if (!group) return null;

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Group Info</h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={group.image || "/default-group.png"} alt="Group" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{group.name || "Unnamed Group"}</h2>
                <p className="text-sm text-gray-500">
                  {group.members?.length || 0} members
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Members</h3>
              <ul className="max-h-48 overflow-y-auto flex flex-col gap-1">
                {group.members?.map((member) => (
                  <li
                    key={member._id}
                    className="bg-base-200 p-2 rounded text-sm flex justify-between items-center"
                  >
                    <span>{member.userName}</span>
                    {member._id === group.admin && (
                      <span className="badge badge-info text-xs">Admin</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-action flex flex-col gap-2 items-start">
              {isAdmin && (
                <button className="btn btn-primary btn-sm" onClick={onAddMembers}>
                  Add Members
                </button>
              )}
              <button className="btn btn-error btn-sm" onClick={onLeaveGroup}>
                Leave Group
              </button>
              <button className="btn btn-outline btn-sm" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupInfoModal;
