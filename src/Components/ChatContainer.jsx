import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import InputMessage from './InputMessage';
import { fetchMessages, addNewMessage } from '../Store/messageStore';
import socket from "../utils/Socket"; // ✅ import socket
import EmptyChatState from './EmptyChatState';

const ChatContainer = () => {
  const dispatch = useDispatch();

  const { SelectedUser, AuthUser } = useSelector((state) => state.auth);
  
  const { messages, status, error } = useSelector((state) => state.message);

  const [user, setUser] = useState(null);
  const [receiverId, setReceiverID] = useState(null);
  const messageEndRef = useRef(null);

  // ✅ Set user and receiverId based on selected chat target
  useEffect(() => {
     if (SelectedUser) {
      console.log("Private chat selected:", SelectedUser._id);
      setUser(SelectedUser);
      setReceiverID(SelectedUser._id);
      // Private chat: no need to emit join here (already done on login)
    } else {
      setUser(null);
      setReceiverID(null);
    }
  }, [SelectedUser]);

  // ✅ Fetch messages for the selected chat
  useEffect(() => {
    if (receiverId) {
      dispatch(fetchMessages(receiverId));
    }
  }, [dispatch, receiverId]);

  // 🔄 Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ✅ Listen for new socket messages (private + group)
  useEffect(() => {
    if (!receiverId) return;

    console.log("Setting up socket listeners for:", receiverId);

    const handlePrivateMessage = (message) => {
      console.log("📥 Received PRIVATE socket message:", message);
      dispatch(addNewMessage(message));
    };

    const handleGroupMessage = (message) => {
      console.log("📥 Received GROUP socket message:", message);
      dispatch(addNewMessage(message));
    };

    socket.on("message received", handlePrivateMessage);
    socket.on("group message received", handleGroupMessage);

    return () => {
      console.log("Removing socket listeners for:", receiverId);
      socket.off("message received", handlePrivateMessage);
      socket.off("group message received", handleGroupMessage);
    };
  }, [receiverId, dispatch]);

  return (
    <div className="h-full flex flex-col">
      {user ? (
        <>
          <ChatHeader />

          <div className="overflow-auto flex-1 p-4 flex flex-col gap-2">
            {status === "loading" && (
              <div className="text-center text-gray-500 text-sm">Loading messages...</div>
            )}
            {error && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}

            {Array.isArray(messages) &&
              messages.map((msg) => {
                const isSender = msg.sender === AuthUser._id;
                return (
                  <div key={msg._id} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={isSender ? AuthUser.image : user.image}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {isSender ? "You" : user.fullName}
                      <time className="text-xs opacity-50 ml-2">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </time>
                    </div>
                    <div className="chat-bubble">
                      {msg.content}
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="attached"
                          className="mt-2 rounded max-w-xs"
                        />
                      )}
                    </div>
                    <div className="chat-footer opacity-50">
                      {isSender ? "Delivered" : ""}
                    </div>
                  </div>
                );
              })}

            {/* Scroll to bottom ref */}
            <div ref={messageEndRef}></div>
          </div>

          {/* Message input */}
          <InputMessage />
        </>
      ) : (
        <div className=" h-full text-center p-4">
          <EmptyChatState />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
