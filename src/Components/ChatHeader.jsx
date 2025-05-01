import { useSelector } from "react-redux";

const ChatHeader = () => {
  const { SelectedUser } = useSelector((state) => state.auth);

  const getAvatarImage = () => {
    if (SelectedUser) return SelectedUser.image;
    return "/default-avatar.png";
  };

  return (
    <div className="shadow-lg">
      <div className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <h1 className="btn btn-ghost text-xl normal-case">
            {SelectedUser ? SelectedUser.userName || "Unknown User" : "Chat"}
          </h1>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="Avatar"
                  src={getAvatarImage()}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
