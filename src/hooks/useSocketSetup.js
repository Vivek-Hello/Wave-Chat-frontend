import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../utils/Socket";

const useSocketSetup = () => {
  const { AuthUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!AuthUser?._id) return;

    console.log("🔄 Connecting socket for AuthUser:", AuthUser._id);
    socket.emit("join", AuthUser._id);

    return () => {
      // Only disconnect if socket is still connected and user was previously joined
      if (socket.connected) {
        socket.emit("leave", AuthUser._id); // Only emit leave if you're handling it in backend (optional)
        console.log("🔌 Disconnected socket room for:", AuthUser._id);
      }
    };
  }, [AuthUser?._id]); // 👈 safer and avoids unnecessary re-renders
};

export default useSocketSetup;
