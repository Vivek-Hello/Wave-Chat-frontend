import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axios";



// ✅ Thunk to fetch messages between current user and a receiver (user or group)
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (receiverId, { rejectWithValue }) => {
    try {
      const res = await axiosConfig.get(`/message/get-message/${receiverId}`);
      return res.data.messages; // ✅ correct 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch messages");
    }
  }
);

// ✅ Thunk to send a message (can include text and image)
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosConfig.post("/message/create-message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.message; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send message");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    status: null,
    error: null,
  },
  reducers: {
    // 🔧 FIXED: push `action.payload`, not `action.payload.message`
    // `action.payload` is already the full message object
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (action.payload) {
          state.messages = [
            ...(Array.isArray(state.messages) ? state.messages : []),
            action.payload
          ];
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exporting actions to be used in components
export const { addNewMessage, clearMessages } = messageSlice.actions;

// Export the reducer
export default messageSlice.reducer;
