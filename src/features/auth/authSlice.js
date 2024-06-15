import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      const token = response.data.body.token;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ token, profile }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName: profile.firstName, lastName: profile.lastName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
