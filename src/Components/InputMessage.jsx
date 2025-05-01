import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../Store/messageStore';
import { toast } from 'react-hot-toast';
import socket from "../utils/Socket.js";

const InputMessage = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { AuthUser, SelectedUser } = useSelector((state) => state.auth);

  const receiverId = SelectedUser?._id;

  const handleSend = async () => {
    if (!receiverId) {
      toast.error("Please select a user to chat with.");
      return;
    }

    if (!text) return;

    const formData = new FormData();
    formData.append('receiverId', receiverId);
    formData.append('content', text);

    try {
      const newMessage = await dispatch(sendMessage(formData)).unwrap();

      socket.emit("send-message", {
        receiverId: SelectedUser._id,
        message: newMessage,
      });

      setText('');
    } catch (err) {
      console.error("Failed to send message:", err);
      toast.error(err.message || 'Failed to send message');
    }
  };

  return (
    <div className="px-6 py-2 flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="input input-bordered flex-1"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />

      <button className="btn btn-primary" onClick={handleSend}>
        <IoSend size={23} />
      </button>
    </div>
  );
};

export default InputMessage;
