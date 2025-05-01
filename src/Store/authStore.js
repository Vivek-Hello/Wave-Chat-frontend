import axiosConfig from "../utils/axios.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Sign Up User
export const SignUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.post("/auth/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

// Log In User
export const LogInUser = createAsyncThunk(
    "auth/logInUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.post("/auth/login", formData, {
                withCredentials: true, // Ensure persistent authentication
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

// Log Out User
export const LogOutUser = createAsyncThunk(
    "auth/logOutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.get("/auth/logout", {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

// Update User
export const Update_User = createAsyncThunk(
    "auth/updateUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.put("/auth/edituser", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

// Check Auth
export const CheckAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.get("/auth/checkauth", {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { users } = getState().auth;
            if (users.length > 0) return { users }; 
            const response = await axiosConfig.get("/auth/getallusers");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        SelectedUser: null,
        users: [],
        isAuth: false,
        AuthUser: null,
        isLoading: false,
        errorMessage: null,
    },

    reducers: {
        resetError: (state) => {
            state.errorMessage = null;
        },
        setSelectedUser: (state, action) => {
            state.SelectedUser = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(SignUpUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(SignUpUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.AuthUser = action.payload.user;
                localStorage.setItem("userId", action.payload.user._id);
            })
            .addCase(SignUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message;

                setTimeout(() => {
                    state.errorMessage = null;
                }, 5000);
            })

            .addCase(LogInUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(LogInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.AuthUser = action.payload.user;
                localStorage.setItem("userId", action.payload.user._id);
            })
            .addCase(LogInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message;

                setTimeout(() => {
                    state.errorMessage = null;
                }, 5000);
            })

            .addCase(LogOutUser.fulfilled, (state) => {
                state.isAuth = false;
                state.AuthUser = null;
                localStorage.removeItem("userId");
            })

            .addCase(Update_User.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(Update_User.fulfilled, (state, action) => {
                state.isLoading = false;
                state.AuthUser = action.payload.user;
            })
            .addCase(Update_User.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message;

                setTimeout(() => {
                    state.errorMessage = null;
                }, 5000);
            })

            .addCase(CheckAuth.fulfilled, (state, action) => {
                state.isAuth = true;
                state.AuthUser = action.payload.user;
            })
            .addCase(CheckAuth.rejected, (state) => {
                state.isAuth = false;
                state.AuthUser = null;
            })

            .addCase(getAllUsers.pending, (state) => {
                if (state.users.length === 0) state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message;

                setTimeout(() => {
                    state.errorMessage = null;
                }, 5000);
            });
    },
});

export const { resetError, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
