import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

export const createUser = createAsyncThunk(
  "create",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("username", data.username);

      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.coverImage) formData.append("coverImage", data.coverImage || "");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_REGISTER_ENDPOINT
        }`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginuser",
  async (data, { rejectWithValue }) => {
    try {
      const payload = { login: data.login, password: data.password };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_LOGIN_ENDPOINT
        }`,
        payload
      );

      if (response.data.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data?.accessToken);
      }
      if (response.data.data?.refreshToken) {
        localStorage.setItem("refreshToken", response.data.data?.refreshToken);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

export const logoutUser = createAsyncThunk("logout", async () => {
  try {
    const token = localStorage.getItem("accessToken");

    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/${
        import.meta.env.VITE_LOGOUT_ENDPOINT
      }`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return true;
  } catch (error) {
    throw error;
  }
});

export const changeAvatar = createAsyncThunk(
  "auth/changeAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_CHANGE_AVATAR_ENDPOINT
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeAvatar = createAsyncThunk(
  "remove-Avatat",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_REMOVE_AVATAR_ENDPOINT
        }`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        user: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const coverImageUpdate = createAsyncThunk(
  "update-coverImage",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("coverImage", file);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_CHANGE_COVER_IMAGE_ENDPOINT
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data?.coverImage;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "current user",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_CURRENT_USER_ENDPOINT
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changeName = createAsyncThunk(
  "change-name",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_UPDATE_NAME_ENDPOINT
        }`,
        { fullName: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUsername = createAsyncThunk(
  "change-username",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_UPDATE_USERNAME_ENDPOINT
        }`,
        { username: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEmail = createAsyncThunk(
  "change-email",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_UPDATE_EMAIL_ENDPOINT
        }`,
        { email: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "change-password",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_CHANGE_PASSWORD_ENDPOINT
        }`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeCoverImage = createAsyncThunk(
  "remove_cover",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${
          import.meta.env.VITE_REMOVE_COVER_IMAGE_ENDPOINT
        }`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("RESPONSE.DATA", response.data);
      return true;
    } catch (error) {
      console.log("cover image not removed");
      return rejectWithValue(error);
    }
  }
);

export const userChannel = createAsyncThunk(
  "user/channel",
  async (username, { rejectWithValue }) => {
    try {
      console.log("username", username);

      // const token=localStorage.getItem("accessToken")

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_USER_CHANNEL_ENDPOINT}/${username}`,
        {
          // headers:{
          //   Authorization:token
          // }
        }
      );

      console.log("responsed data", response.data);
      return response.data?.data[0];
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  status: false,
  Channel: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.user = null), (state.status = false);
        state.loading = false;

        console.log("user", state.user);
        console.log("status", state.status);
        console.log("loading", state.loading);
      })
      .addCase(changeAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.loading = false;
        // state.user.avatar = action.payload;
        // console.log("actioncnage.payload", action.payload.data);
      })
      .addCase(removeAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.avatar = null;
        }
      })
      .addCase(coverImageUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(coverImageUpdate.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Updated user after cover change:", state.user);
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        (state.loading = false), console.log("current user...", action.payload);
        state.user = action.payload.data || action.payload;
        state.status = true;
      })
      .addCase(changeName.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeName.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsername.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
        console.log("state.usessssr", state.user);
      })
      .addCase(removeCoverImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCoverImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(userChannel.fulfilled, (state, action) => {
        (state.loading = false), (state.Channel = action.payload);
        console.log("satate.channel", state.Channel._id);
      });
  },
});

export default authSlice.reducer;
